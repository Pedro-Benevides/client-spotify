import React from 'react';

export default function ResultadosFaixa ({faixa,escolha}){
    function ShowAlbum(){
         escolha()
    }
    
    return( 
        <div className="d-flex m-2 align-items-center"
        style={{cursor: 'pointer'}} >
            <img src={faixa.albumUrl} alt="album" style={{height:'64px', width:'64px'}}/>
            <div className="m-2">
                <div>{faixa.title}</div>
                <div className="text-muted">{faixa.artists}</div>
            </div>
        </div>
        
        )
}