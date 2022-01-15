import React from 'react';
import {Link} from 'react-router-dom'
import {Fragment} from "react"

export default function LandingPage(){
    return(
        <Fragment>
        <div>
        <h1>Welcome to your Pokedex</h1>
        <Link to='/home'>
            <button>Enter</button>
        </Link>
        </div>
        </Fragment>
    )
}