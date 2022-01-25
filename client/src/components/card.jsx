import React from 'react';
import "./card.css"

export default function PokeCard({img,name,types}){
    return(
        <div className="card-container">
            <img src = {img} alt="img not found" width= "200px" height="250px" /> 
            <h3 className="name-card">{name}</h3>
            <h4 className="types-card">{types}</h4>
            
        </div>
    )
}