const mongoose = require('mongoose')
const videojuegoSchema = mongoose.Schema({
        nombre: {
            type: String, 
            required: true
            },
        precio: {
            type: Number
        },
    },
    {
        timestamps: true
    }
)
const Videojuego = mongoose.model('Videojuego', videojuegoSchema)

module.exports = Videojuego