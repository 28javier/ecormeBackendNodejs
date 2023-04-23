require("dotenv").config();
const express = require('express');
const cors = require("cors");
const { dbConnection } = require("./config/db");
const app = express();

const clienteRouter = require('./routes/cliente.routes');
const usuarioCRouter = require('./routes/usuarioC.routes');
const productoRouter = require('./routes/producto.routes');


// configurar cors
app.use(cors());
// lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Base de Datos
dbConnection();

//Rutas
app.use('/api', clienteRouter);
app.use('/api', usuarioCRouter);
app.use('/api', productoRouter);

// levantar servidor
app.listen(process.env.PORT, () => {
    console.log("On Run Server \x1b[32m%s\x1b[0m", process.env.PORT);
});

module.exports = app;