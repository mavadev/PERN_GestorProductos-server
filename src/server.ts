import express from 'express';
import router from './router';
import { connectDatabase } from './config/database';

const server = express();

// Leer datos de formulario
server.use(express.json());

// Routing
server.use('/api/products', router);
server.use('/api', (req, res) => {
	res.json({ msg: 'Desde API' });
});

// Conexión a la base de datos
connectDatabase();

export default server;
