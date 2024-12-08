import express from 'express';
import router from './router';
import colors from 'colors';
import database from './config/database';

const server = express();

// Leer datos de formulario
server.use(express.json());

// Routing
server.use('/api/products', router);
server.use('/api', (req, res) => {
	res.json({ msg: 'Desde API' });
});

// Conexión a la base de datos
export async function connectDatabase() {
	try {
		await database.authenticate();
		database.sync();
		if (process.env.npm_lifecycle_event !== 'test') console.log(colors.blue.bold('Conexión exitosa a la DB'));
	} catch (error) {
		console.log('Hubo un error al conectarse a la DB');
	}
}

export default server;
