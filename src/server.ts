import express from 'express';
import { connectDatabase } from './config/database';

const server = express();

// Conexión a la base de datos
connectDatabase();

// Routing
server.get('/', (req, res) => {
	res.send('Hola Mundo');
});

export default server;
