import React from 'react';

export default function PokeCard({img,name,types}){
    return(
        <div>
            <img src = {img} alt="img not found" width= "200px" height="250px" /> 
            <h3>{name}</h3>
            <h4>{types}</h4>
            
        </div>
    )
}