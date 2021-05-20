import React from 'react';
import {Container} from "react-bootstrap"

const AUTENTICACAO_URL ="https://accounts.spotify.com/authorize?client_id=1291da22230a4deba7a9f66e364d1b63&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login(){
    return(
        <Container class="d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
            <a className="btn btn-success btn-lg" href={AUTENTICACAO_URL}>Login com Spotify
            </a>
        </Container>
    )
}
