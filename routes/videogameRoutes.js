const express = require('express');
const { getAllVideogames } = require('../controllers/videogameController');

const videogameRouter = express.Router();

videogameRouter.get('/readall', getAllVideogames); //http://localhost:3000/api/product/readall

module.exports = videogameRouter;