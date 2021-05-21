import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import useAut from './useAut'
import SpotifyWebApi from 'spotify-web-api-node'
import ResultadoFaixa from './ResultadoFaixa'


const spotifyApi = new SpotifyWebApi({
    clientId: '1291da22230a4deba7a9f66e364d1b63'
})

export default function Dashboard({ code }) {
    const tokenAcesso = useAut(code)
    const [busca, setBusca] = useState('')
    const [resultados, setResultados] = useState([])
    const [buscaAlbum, setBuscaAlbum] = useState([])


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
                    setBuscaAlbum(data.body.albums.map(infos=>{
                    const menorImagem = infos.images.reduce((menor, image) => {
                        if (image.height < menor.height) return image
                        return menor
                    }, infos.images[0])
    
                    return {
                        title:infos.name,
                        artists:infos.artists[0].name,
                        spotify:infos.external_urls.spotify,
                        lançamento:infos.release_date,
                        totalMusicas:infos.total_tracks,
                        albumUrl:menorImagem.url
                    }  
                }))
              
            
            }, function(err) {
                console.error(err);
              });
            
            setResultados(res.body.tracks.items.map(faixa => {
                const menorImagem = faixa.album.images.reduce((menor, image) => {
                    if (image.height < menor.height) return image
                    return menor
                }, faixa.album.images[0])
                
                return {
                    artists: faixa.artists[0].name,
                    title: faixa.name,
                    uri: faixa.uri,
                    albumId: faixa.album.id,
                    externalUrl:faixa.album.external_urls,
                    albumUrl: menorImagem.url
                }
                
            }))
    
        })
        return () => cancelar = true
    }, [busca, tokenAcesso])


    {/*spotifyApi
        .getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 1 })
        .then(
            function(data) {
            console.log('Album name:', data.body.items[0].name,' artista:',data.body.items[0].artists[0].name,' abrir no spotify: ',data.body.items[0].external_urls.spotify,' data de lançamento: ',data.body.items[0].release_date,'total de músicas',data.body.items[0].total_tracks);
            },
            function(err) {
            console.error(err);
            }
        );*/}


    return (<Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
        <Form.Control type='search' placeholder='Buscar Músicas/Artistas' value={busca} onChange={e => setBusca(e.target.value)} />
        <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
            {buscaAlbum.map(faixa => (
                <ResultadoFaixa faixa={faixa} key={faixa.spotify} />
            ))}
        </div>
        <div>
            {/*<Player tokenAcesso={tokenAcesso}/>*/}
        </div>
    </Container>)
}