import React from 'react';
import {Container, Button} from "react-bootstrap"
import Background from './LoginBackground.PNG'

const AUTENTICACAO_URL ="https://accounts.spotify.com/authorize?client_id=1291da22230a4deba7a9f66e364d1b63&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login(){
    

    return(
        <div style={{
            backgroundImage: `url("${Background}")`,
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
        }}>
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
            <a href={AUTENTICACAO_URL}><Button variant="success">Login com Spotify</Button>{''}</a>
        </Container>
        </div>

    )
}
