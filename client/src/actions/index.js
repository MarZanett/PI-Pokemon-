import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/api/pokemons", {});
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
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