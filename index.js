const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./config/db');

const Videojuego = require('./models/Videojuego');

const userRouter = require('./routes/userRoutes');
const videogameRouter = require('./routes/videogameRoutes');

require('dotenv').config();

connectDB();

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3002'
];

// const corsOptions = {
//     origin: function (origin, callback) {
//       // Permitir solicitudes sin origen (como Postman) o si el origen está en la lista permitida
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     }
//   };

app.use(cors());
app.use(express.json())

app.use('/api/user', userRouter) // http://localhost:3000/api/user
app.use('/api/product', videogameRouter); //http://localhost:3000/api/product


app.post("/crear-videojuego", async(req, res) => {
    const { nombre, precio } = req.body
    try {
        const nuevoVideojuego = await Videojuego.create({ nombre, precio })
        res.json(nuevoVideojuego)
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error creando el videojuego",
            error: error.message
        })
    }
})

app.put("/actualizar-videojuego", async (req, res) => {
    const { id, nombre, precio } = req.body
    try {
        const actualizacionVideojuego = 
	        await Videojuego.findByIdAndUpdate(id, { nombre, precio }, { new: true })
        res.json(actualizacionVideojuego)
    } catch (error) {       
        res.status(500).json({
            msg: "Hubo un error actualizando el videojuego",
            error
        })
    }
})

app.delete("/borrar-videojuego", async (req, res) => {
    const { id } = req.body
    try {
        const videojuegoBorrado = await Videojuego.findByIdAndDelete({_id: id })
        res.json(videojuegoBorrado)
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error eliminando el videojuego",
            error
        })
    }
})


app.listen(process.env.PORT, () => console.log('Servidor escuchando en el puerto ' + process.env.PORT))