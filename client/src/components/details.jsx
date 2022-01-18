import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector,  } from "react-redux";
import { getDetail } from "../actions";

export default function PokemonDetail(props) {
    //console.log(props)
  const dispatch = useDispatch();
const {id}=useParams() 

  useEffect(() => {
    dispatch(getDetail(id));

  },[dispatch,id]);

  const myPokemon = useSelector((state) => state.detail);
console.log(myPokemon)
  return (
    <div>
      {myPokemon ? (
        <div>
          <h1>{myPokemon.name}</h1>
          <img src={myPokemon.image} alt="img" width="300px" height="500px" />
          <h3>Types: {myPokemon.types}</h3>
          <h3>Id: {myPokemon.id}</h3>
          <h3>Hp: {myPokemon.hp}</h3>
          <h3>Strength: {myPokemon.attack}</h3>
          <h3>Defense {myPokemon.defense}</h3>
          <h3>Speed: {myPokemon.speed}</h3>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">Return</Link>;
    </div>
  );
}
