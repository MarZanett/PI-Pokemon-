import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(evt) {
    evt.preventDefault();
    setName(evt.target.value);
    console.log(name);
    
    
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(getPokemonByName(name.toLowerCase()));
    setName("")
    
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Name"
        onChange={(evt) => handleInputChange(evt)}
      />
      <button type="submit" onClick={(evt) => handleSubmit(evt)}>
        Send
      </button>
    </div>
  );
}
