import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName } from "../actions";
import { postPokemon, getTypes } from "../actions";

function validate(input) {
  let error = {};
  if (!input.name) {
    error.name = "Name required";
  } else if (!input.hp) {
    error.hp = "Hp required";
  } else if (!input.attack) {
    error.attack = "Attack required";
  } else if (!input.defense) {
    error.defense = "Defense required";
  } else if (!input.speed) {
    error.speed = "Speed required";
  } else if (!input.height) {
    error.height = "Height required";
  } else if (!input.weight) {
    error.weight = "Weight required";
  }
  return error;
}

export default function PokemonCreated() {
  const dispatch = useDispatch();
  //const history = useHistory();
  const allTypes = useSelector((state) => state.types);
  const [error, setError] = useState({});
  //console.log(allTypes.map(e=>e.name))
  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  function handleChange(evt) {
    evt.preventDefault();
    setInput({
      ...input,
      [evt.target.name]: evt.target.value,
    });
    setError(
      validate({
        ...input,
        [evt.target.name]: evt.target.value,
      })
    );
    //console.log(input)
  }

  function handleSelect(evt) {
    setInput({
      ...input,
      types: [input.types, evt.target.value], //Se agrega en un arreglo todo lo seleccionado
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    //console.log(input);
    dispatch(postPokemon(input));
    alert("¡Pokemon Created!");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      img: "",
      types: [],
    });
    //history.push("/home")
  }

  function handleDelete(el) {
    setInput({
      ...input,
      types: input.types.filter((typ) => typ !== el),
    });
  }

  return (
    <div>
      <Link to="/home">
        <button>Return</button>
      </Link>
      <h1>Create your Pokemon</h1>
      <form onSubmit={(evt) => handleSubmit(evt)}>
        <div>
          <label> Name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(evt) => handleChange(evt)}
          />
          {error.name && <p className="error">{error.name}</p>}
        </div>

        <div>
          <label>Hp: </label>
          <input
            type="number"
            value={input.hp}
            name="hp"
            onChange={(evt) => handleChange(evt)}
          />
          {error.hp && <p className="error">{error.hp}</p>}
        </div>

        <div>
          <label>Attack: </label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={(evt) => handleChange(evt)}
          />
          {error.attack && <p className="error">{error.attack}</p>}
        </div>

        <div>
          <label>Defense: </label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(evt) => handleChange(evt)}
          />
          {error.defense && <p className="error">{error.defense}</p>}
        </div>

        <div>
          <label>Speed: </label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={(evt) => handleChange(evt)}
          />
          {error.speed && <p className="error">{error.speed}</p>}
        </div>

        <div>
          <label>Height: </label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(evt) => handleChange(evt)}
          />
          {error.height && <p className="error">{error.height}</p>}
        </div>

        <div>
          <label>Weight: </label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(evt) => handleChange(evt)}
          />
          {error.weight && <p className="error">{error.weight}</p>}
        </div>

        <div>
          <label>Img: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(evt) => handleChange(evt)}
          />
        </div>

        <select onChange={(evt) => handleSelect(evt)}>
          {allTypes.map((typ) => (
            <option value={typ.name}>{typ.name}</option>
          ))}
        </select>

        <br/>
          <button type="submit">Create Pokemon</button>
        
      {
        console.log(input.types.map(el => el)),

        input.types.map((el) => {
        <div className="divTyp">
          <p>{el}</p>
          <button className="botX" onClick={() => handleDelete(el)}>
            X
          </button>
        </div>;
      })}
      </form>

    </div>
  );
}
