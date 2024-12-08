import colors from 'colors';
import express from 'express';
import database from './config/database';
import router from './router';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

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
connectDatabase();

const server = express();

// Leer datos de formulario
server.use(express.json());

// Routing
server.use('/api/products', router);

// Documentation
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;
