import React from 'react';



export default function Toptracks({tracks}){
    return(
          <div className="d-flex m-2 align-items-center">
            <a href={tracks.spotify}>
            <img src={tracks.img} alt="album" style={{height:'64px', width:'64px',cursor: 'pointer'}}/>
            </a>
              <div className="m-2"  >
                <div>{tracks.title}</div>
                <div>{tracks.artist}</div>
              </div>
          </div>
    )
}