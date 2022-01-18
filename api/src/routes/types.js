const axios = require("axios");
const { Router } = require("express");
const { Type } = require("../db");
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const typesBD = await Type.findAll({
      //Primero me fijo si los tipos están en la base de datos
      // atributes: ['name', 'id'], //trae la data mediante el nombre(la propiedad del modelo type)
    });
    if (!typesBD.length) {
      //si no están, los busco en el api
      let typesAPI = await axios.get('https://pokeapi.co/api/v2/type');
      typesAPI = await typesAPI.data.results.map((type) => {
        return { id: type.id, name: type.name };
      });

      await Type.bulkCreate(typesAPI); //los guardo todos, bulkCreate me permite guardar un array de elementos de un solo jalón
      return res.send(typesAPI);
    }
    res.send(typesBD); // si estaba en la base de datos mando la respuesta
  } catch (error) {
    res.status(404).send('error');
  }
});

// const getApiData = async () => {
//   const apiUrl = await axios.get("https://pokeapi.co/api/v2/type");
//   const types = await apiUrl.data.results.map((type) => {
//     return {
//       name: type.name,
//     };
//   });

//   const typesBd = await types.forEach((t) => {
//     return Type.findOrCreate({
//       where: {
//         name: t.name,
//       },
//     });
//   });

//   const allTypes = await Type.findAll();
//   //console.log(allTypes);
//   return allTypes;
// };

// router.get("/", async (req, res, next) => {
//   try {
//     const types = await getApiData();
//     res.status(200).send(types);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
