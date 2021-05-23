import { useEffect, useState } from 'react';
import {Container, Form, ListGroup, Navbar } from 'react-bootstrap';
import useAut from './useAut'
import SpotifyWebApi from 'spotify-web-api-node'
import ResultadoAlbum from './ResultadoAlbum'
import Top_tracks from './Top_tracks'


const spotifyApi = new SpotifyWebApi({
    clientId: '1291da22230a4deba7a9f66e364d1b63'
})

export default function Dashboard({ code }) {
    const tokenAcesso = useAut(code)
    const [busca, setBusca] = useState('')
    const [resultados, setResultados] = useState([])
    const [top,setTop] = useState([])

    
    useEffect(() => {
        if (!tokenAcesso) return
        spotifyApi.setAccessToken(tokenAcesso)
    }, [tokenAcesso])

    useEffect(() => {
        if (!busca) return setResultados([])
        if (!tokenAcesso) return
        var albunsID = []
        var cancelar = false
    
        spotifyApi.searchTracks(busca,{ limit: 10}).then( res => {
            if (cancelar) return
            
            res.body.tracks.items.map(faixa=>{
            return albunsID.push(faixa.album.id)
            })
                spotifyApi.getAlbums([albunsID]).then((data)=> {
                    setResultados(data.body.albums.map(albums=>{
                    const menorImagem = albums.images.reduce((menor, image) => {
                        if (image.height < menor.height) return image
                        return menor
                    }, albums.images[0])
                     
                    return {
                        title:albums.name,
                        artists:albums.artists[0].name,
                        spotify:albums.external_urls.spotify,
                        lancamento:albums.release_date,
                        totalMusicas:albums.total_tracks,
                        albumImg:menorImagem.url,
                        id:albums.id,
                        faixas: albums.tracks.items
                    }  
                }))
            
            }, function(err) {
                console.error(err);
                });
        })
        return () => cancelar = true
    }, [busca, tokenAcesso])

    useEffect(() => {
        if (!tokenAcesso) return setTop([])

        spotifyApi.getMySavedTracks({limit : 11}).then(function(data) {
            console.log(data.body);
            setTop(data.body.items.map(tracks =>{
                const trackImg = tracks.track.album.images.reduce((menor, image) => {
                    if (image.height < menor.height) return image
                    return menor
                }, tracks.track.album.images[0])

                return{
                    artist:tracks.track.artists[0].name,
                    img:trackImg.url,
                    title:tracks.track.name,
                    spotify:tracks.track.external_urls.spotify
                }
            }))
          }, function(err) {
            console.error(err);
            })
        
    },[tokenAcesso])


    return (
    <Container className="d-flex flex-column py-5" style={{ height: "100vh" }}>
            <Navbar fixed='top' bg="dark" variant="dark" style={{ height: "65px" }}>
                <Container className='align-items-center'>
                    <Form>
                    <Form.Control style={{ width: "143vh" }} type='search' placeholder='Buscar Álbuns' value={busca} onChange={e => setBusca(e.target.value)} />
                    </Form>
                </Container>
            </Navbar>
        <ListGroup>
            <div  className="flex-grow-1" style={{ overflowY: 'auto',position:'absolute',width: "143vh" }}>
                <ListGroup.Item>
                    {resultados.map(album => (
                        <ResultadoAlbum album={album}
                        key={album.spotify}/>
                        ))}
                </ListGroup.Item>
            </div>
        </ListGroup>
        <Container className="d-flex justify-content-center" style={{minHeight:"100vh"}}>
            <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
                <h5 className="mt-3">Tocadas recentemente</h5>
                {top.map(tracks => (
                    <Top_tracks tracks={tracks}
                    key={tracks.spotify}/>
                ))}
            </div>
        </Container>
        <div>
            <Navbar style={{ height: "15px" }} fixed='bottom' bg="dark" variant="dark"></Navbar>
        </div>
    </Container>)
}