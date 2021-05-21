import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import useAut from './useAut'
import SpotifyWebApi from 'spotify-web-api-node'
import ResultadoFaixa from './ResultadoFaixa'
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

        let cancelar = false
        spotifyApi.searchTracks(busca).then(res => {
            if(cancelar) return
            setResultados(res.body.tracks.items.map(faixa => {
                const menorImagem = faixa.album.images.reduce((menor, image) => {
                    if (image.height < menor.height) return image
                    return menor
                }, faixa.album.images[0])
                return {
                    artists: faixa.artists[0].name,
                    title: faixa.name,
                    uri: faixa.uri,
                    albumUrl: menorImagem.url

                }
            }))
        })
        return () => cancelar = true
    }, [busca, tokenAcesso])



    return (<Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
        <Form.Control type='search' placeholder='Buscar Músicas/Artistas' value={busca} onChange={e => setBusca(e.target.value)} />
        <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
            {resultados.map(faixa => (
                <ResultadoFaixa faixa={faixa} key={faixa.uri} />
            ))}
        </div>
        <div> 
            <Player tokenAcesso={tokenAcesso}/> 
        </div>
    </Container>)
}