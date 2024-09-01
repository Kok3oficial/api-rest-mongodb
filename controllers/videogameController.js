const Videojuego = require('../models/Videojuego');

exports.getAllVideogames = async (req, res) => {
    try {
        const videojuegos = await Videojuego.find({});
        res.json({videojuegos}) 
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error al intentar obtener las guitarras",
            error
        })
    }
}