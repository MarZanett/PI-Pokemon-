const initialState = {
  pokemons: [],
  allPokemons: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };

    case "FILTER_BY_TYPE":
      const allPokemons = state.allPokemons;
      const statusFiltered =
        action.payload === "all"
          ? allPokemons
          : allPokemons.filter(
              (el) =>
                el.typeOne === action.payload || el.typeTwo === action.payload
            );
      return {
        ...state,
        pokemons: statusFiltered,
      };

    case "FILTER_CREATED":
      const allPokemonsDb = state.allPokemons;
      const createdFilter =
        action.payload === "created"
          ? allPokemonsDb.filter((el) => el.createdInDB)
          : allPokemonsDb.filter((el) => !el.createdInDB);
      return {
        ...state,
        pokemons: action.payload === "all" ? state.allPokemons : createdFilter,
      };

    case "ORDER_NAME":
      const sorterdArr =
        action.payload === "asc"
          ? state.pokemons.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sorterdArr,
      };

      case "ORDER_STR":
        const sorterdArray =
        action.payload === "asc"
          ? state.pokemons.sort((a, b) => {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sorterdArray,
      };

    default:
      return state;
  }

}

export default rootReducer;
