import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import useAut from './useAut'
import SpotifyWebApi from 'spotify-web-api-node'
import ResultadoAlbum from './ResultadoAlbum'
import Player from './Player'


const spotifyApi = new SpotifyWebApi({
    clientId: '1291da22230a4deba7a9f66e364d1b63'
})

export default function Dashboard({ code }) {
    const tokenAcesso = useAut(code)
    const [busca, setBusca] = useState('')
    const [resultados, setResultados] = useState([])
  

    
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
                        console.log(albums.tracks.items)
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


    return (<Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
        <Form.Control type='search' placeholder='Buscar Álbuns' value={busca} onChange={e => setBusca(e.target.value)} />
        <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
            {resultados.map(album => (
                <ResultadoAlbum album={album} 
                key={album.spotify}/>
            ))}
        </div>
        <div>
            <Player tokenAcesso={tokenAcesso} />
        </div>
    </Container>)
}