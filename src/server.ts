import express from 'express';
import router from './router';

const server = express();

// Leer datos de formulario
server.use(express.json());

// Routing
server.use('/api/products', router);

export default server;
