import React from 'react';
import { Button, Card, CardColumns, CardDeck, CardGroup, Col, Container, ListGroup, OverlayTrigger, Popover, Row } from 'react-bootstrap';

export default function ResultadosAlbum ({album}){
    
    function formatData(data){
        var format= Date.parse(data)
        var novaData = new Date(format)
        var ano = novaData.getFullYear()
        return ano
    }

    function time(duration_ms){
        var timesec = (duration_ms/1000)
        var timemin = parseInt(timesec/60)
        timesec = (timesec%60)
        timemin = (timemin.toString()+':'+(timesec.toFixed()).toString())
        return timemin
    }

    const popover=(
        <Popover>
            <Container className="d-flex flex-column " style={{ height: "380px" }}>
                <Popover.Title as="h3">Neste álbum:</Popover.Title>
                <div style={{overflowY: 'auto' }}>
                    {album.faixas.map((faixa,index) => index<5 && (
                        <Popover.Content>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h6>{faixa.name}</h6>
                                        <div>
                                        {faixa.artists.map(artistas=>(<small>{artistas.name} - </small>))}
                                        <small> {formatData(album.lancamento)}</small>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>Duração: {time(faixa.duration_ms)} min</ListGroup.Item>
                                    <ListGroup.Item>
                                        <h6>{faixa.preview_url? ['Prévia ']:['Prévia indisponivel']}</h6>
                                        <div className='d-flex m-2'>
                                        <audio id="demoPlayer" src={faixa.preview_url? [faixa.preview_url]:[]} controls></audio>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item><a href={faixa.external_urls.spotify}>Ouvir no Spotify</a></ListGroup.Item>    
                                </ListGroup>
                            </Card>
                    </Popover.Content>
                    ))}
                </div>
            </Container>
        </Popover>
    )


    return(
        
        <div className="d-flex m-2 align-items-center">
            <img src={album.albumImg} alt="album" style={{height:'64px', width:'64px'}}/>
            <OverlayTrigger
                trigger="click"
                placement='right-start'
                overlay={popover}
            > 
                <div className="m-2" style={{cursor: 'pointer'}} >
                    <div>{album.title}</div>
                    <div>{album.artists}</div>
                    <div className="text-muted">Músicas: {album.totalMusicas}</div>
                </div>
            </OverlayTrigger>
        </div>
        )
}