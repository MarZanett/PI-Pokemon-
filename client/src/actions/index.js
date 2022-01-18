import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/api/pokemons", {});
      return dispatch({
        type: "GET_POKEMONS",
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/api/types", {});
     // console.log(json.data.name)
      return dispatch({
        type: "GET_TYPES",
        payload: json.data,
      });
    } 
    catch (err) {
      console.error(err);
    }
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const data = await axios.post("http://localhost:3001/api/pokemons",payload);
    console.log(data);
    return data
  };
}

export function getPokemonByName(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/api/pokemons/?name=${name}`
      );
      return dispatch({
        type: "GET_BY_NAME",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function filterPokemonByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

export function filterPokemonCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_NAME",
    payload,
  };
}

export function orderByStr(payload) {
  return {
    type: "ORDER_STR",
    payload,
  };
}

export function getDetail(id){
return async function (dispatch) {
  try{
    const json = await axios.get(`http://localhost:3001/api/pokemons/${id}`)
    
    return dispatch({
      type: "GET_DETAIL",
      payload: json.data,
    })
  }
  catch (err) {
    console.log(err)
  }
}
}