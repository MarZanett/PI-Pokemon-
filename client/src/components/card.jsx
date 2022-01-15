import React from 'react';

export default function PokeCard({img,name,typeOne,typeTwo}){
    return(
        <div>
            <img src = {img} alt="img not found" width= "200px" height="250px" /> 
            <h3>{name}</h3>
            <h4>{typeOne}</h4>
            <h4>{typeTwo}</h4>
        </div>
    )
}