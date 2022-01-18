import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterPokemonByType,
  filterPokemonCreated,
  orderByName,
  orderByStr,
} from "../actions";
import { Link } from "react-router-dom";
import PokeCard from "./card";
import { Fragment } from "react";
import Paginado from "./paginado";
import SearchBar from "./searchBar";


export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons); //Me traigo del reducer el stado pokemons
  const [currentPage, setCurrentPage] = useState(1); //Pagina actual
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12); // Pokemon por pagina
  const [orderName,setOrderName] = useState("") // Es un estado local que arranca vacio 
  const [orderStr,setOrderStr] = useState("")
  const indexOfLastPokemon = currentPage * pokemonsPerPage; // Indice del ultimo pokemon
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // Indice del primer Pokemon
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(evt) {
    evt.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterType(e) {
    dispatch(filterPokemonByType(e.target.value));
  }

  function handleFilterDb(e) {
    dispatch(filterPokemonCreated(e.target.value));
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrderName(`Sorted ${e.target.value}`);
  }

  function handleOrderByStr(e) {
    e.preventDefault();
    dispatch(orderByStr(e.target.value));
    setCurrentPage(1);
    setOrderStr(`Sorted ${e.target.value}`);
  }

  return (
    <div>
      <Link to="/pokemons">Create Pokemon</Link>
      <button
        onClick={(evt) => {
          handleClick(evt);
        }}
      >
        Reload Pokemons
      </button>

      <div>
        <div>
          <p>Order by name</p>
          <select onChange={(evt) => handleOrderByName(evt)}>
            <option value="asc">Ascendant(A-Z)</option>
            <option value="desc">Descending(Z-A)</option>
          </select>
        </div>

        <div>
          <p>Existing or Created</p>
          <select onChange={(evt) => handleFilterDb(evt)}>
            <option value="all">All</option>
            <option value="api">Existing</option>
            <option value="created">Created</option>
          </select>
        </div>

        <div>
          <p>Order by Strength</p>
          <select onChange={(evt) => handleOrderByStr(evt)}>
            <option value="asc">Ascendant (min-max)</option>
            <option value="desc">Descending (max-min)</option>
          </select>
        </div>

        <div>
         <p>Order by Type of Pokemon</p>
         <select onChange={(evt) => handleFilterType(evt)}>
            <option value="all">All</option>
            <option value="normal">Normal</option>
            <option value="fighting">Fighting</option>
            <option value="flying">Flying</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="rock">Rock</option>
            <option value="bug">Bug</option>
            <option value="ghost">Ghost</option>
            <option value="steel">Steel</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="psychic">Psychic</option>
            <option value="ice">Ice</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="fairy">Fairy</option>
            <option value="shadow">Shadow</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />

        <SearchBar />

        {currentPokemons?.map((el) => {
          return (
            <Fragment>
              <Link to={"/home" + el.id}>
                <PokeCard
                  key={el.id}
                  name={el.name}
                  img={el.image}
                  types={el.types.join(' - ')}
                />
              </Link>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
