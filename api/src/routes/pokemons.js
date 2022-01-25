const { default: axios } = require("axios");
const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const router = Router();
const allPokemons = require("../funciones/pokemons");
const service = new allPokemons();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name === undefined) {
      const allPokeApi = await service.getPokemonsApi();
      const allPokeDB = await service.getPokemonsDB();
      //console.log(allPokeDB)
      if (allPokeDB.length > 0) {
        const AllPoke = allPokeApi.concat(allPokeDB);
        res.send(AllPoke);
      } else {
        res.send(allPokeApi);
      }
    } else if (name) {
      const allPokeApi = await service.getApiPokeByName();
      const allPokeDB = await service.getPokemonsDB();
      //console.log(allPokeDB)
      if (allPokeDB.length > 0) {
        const AllPoke = allPokeApi.concat(allPokeDB);
        const buscadoDB = AllPoke.filter((e) => e.name === name);
        res.status(200).send(buscadoDB);
      } else {
        const buscado = await allPokeApi.filter((e) => e.name === name);
        res.status(200).send(buscado);
      }
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id.length > 5) {
      const PokemonDBID = await service.getPokemonDBbyId(id);
      if (PokemonDBID) return res.status(200).json(PokemonDBID);
      return res.status(404).send("ID NOT FOUND");
    }
    const PokemonID = await service.getPokemonById(id);
    if (PokemonID) return res.status(200).json(PokemonID);
    return res.status(404).send("ID NOT FOUND");
  } catch (e) {
    res.status(200).send(e);
  }
});



router.post("/", async (req, res) => {
  const {
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
    types,
    createdInDB,
  } = req.body;

  try {
    const newPokemon = await Pokemon.create({
      name: name.toLowerCase(),
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      createdInDB,
    });
    console.log(newPokemon);

    
      const typesDB = await Type.findAll({
        where: {
          name: types,

        },
        include: [Pokemon]
      });
      newPokemon.addType(typesDB);
    

    res.status(200).send("Pokemon created");
  } catch (err) {
    res.status(400).send("Fall pokeCreated");
  }
});

module.exports = router;
