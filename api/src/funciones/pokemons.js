const axios = require("axios");
const { Pokemon, Type, conn } = require("../db");
const { Op } = require("sequelize");
const { v4 } = require('uuid');

class PokemonsFunctions {
  constructor() {}

  async getPokemonsApi() {
    try {
      const Api = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
      const resMap = Api.data.results.map((e) => axios.get(e.url));
      const promise = await Promise.all(resMap).then((e) => {
        let pokemon = e.map((e) => e.data);
        let arrPokem = [];
        pokemon.map((e) => {
          arrPokem.push({
            id: e.id,
            name: e.name,
            hp: e.stats[0].base_stat,
            attack: e.stats[1].base_stat,
            defense: e.stats[2].base_stat,
            speed: e.stats[5].base_stat,
            height: e.height,
            weight: e.weight,
            image: e.sprites.other.dream_world.front_default,
            types:e.types.map((e) =>e.type.name)
            
            
          });
        });
        return arrPokem;
      });
      return promise;
    } catch (e) {
      console.log(e);
    }
  }
  


  async getPokemonsDB() {
    try {
      const PokeDB = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ["name","id"],
        },
        through:{attributes:[]}
        // attributes: [
        //   "id",
        //   "name",
        //   "hp",
        //   "attack",
        //   "defense",
        //   "speed",
        //   "height",
        //   "weight",
        //   "image",
          
        //   "createdInDB",
        // ],
      });
      return PokeDB;
    } catch (e) {
      console.log(e);
    }
  }

  async getApiPokeByName(name) {
    if (typeof name === "string") {
      name = name.toLowerCase();
      // console.log(name)
    }
    try {
      const foundPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}/`
      );
      const detailPokemon = {
        id: foundPokemon.data.id,
        name: foundPokemon.data.name,
        hp: foundPokemon.data.stats[0].base_stat,
        attack: foundPokemon.data.stats[1].base_stat,
        defense: foundPokemon.data.stats[2].base_stat,
        speed: foundPokemon.data.stats[5].base_stat,
        height: foundPokemon.data.height,
        weight: foundPokemon.data.weight,
        image: foundPokemon.data.sprites.other.dream_world.front_default,
        typeOne: foundPokemon.data.types.map((e) => e.name)[0],
        typeTwo: foundPokemon.data.types.map((e) => e.name)[1],
      };
      return detailPokemon;
    } catch (err) {
      console.log(err);
    }
  }

  async getDBPokeByName(name) {
    name = name.toLowerCase();
    try {
      const PokeDB = await Pokemon.findOne({
        where: {
          name: name,
        },
        attributes: [
          "dbId",
          "name",
          "hp",
          "attack",
          "defense",
          "speed",
          "height",
          "weight",
          "image",
        ],
        include: {
          model: Type,
          attributes: ["id", "name"],
        },
      });
      return PokeDB;
    } catch (e) {
      console.log(e);
    }
  }

  async getPokemonById(id) {
    const ApiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const value = ApiId.data;
    return {
      id: value.id,
      name: value.name,
      hp: value.stats[0].base_stat,
      attack: value.stats[1].base_stat,
      defense: value.stats[2].base_stat,
      speed: value.stats[5].base_stat,
      height: value.height,
      weight: value.weight,
      image: value.sprites.other.home.front_default,
      types: value.types.map((e) => e.type.name).join(", "),
    };
  }

  async getPokemonDBbyId(id) {
    try {
      const PokeDB = await Pokemon.findByPk(id, {
        include: {
          model: Type,
          attributes: ["id", "name"],
        },
      });
      return PokeDB;
    } catch (e) {
      console.log(e);
    }
  }


  async getID(data) {
    let types = [];
    for (let i = 0; i < data.length; i++) {
      types.push(
        await Type.findOne({
          where: { name: data[i] },//en la tabla types busco los tipos de pokemon por id, y regreso solo sus ids en un array
          attributes: ['id'],//saco el atributo id
        })
      );
    }
    return types;
  }

  async getNamesByTypes(pokemon) {
    pokemon = pokemon.types.map((e) => e.dataValues.name);
    return pokemon;
  }


 }

module.exports = PokemonsFunctions;
