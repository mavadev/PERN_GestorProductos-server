import cors, { CorsOptions } from 'cors';
import path from 'path';
import morgan from 'morgan';
import yamljs from 'yamljs';
import colors from 'colors';
import express from 'express';
import router from './router';
import swaggerUI from 'swagger-ui-express';
import database from './config/database';
import { addMetaResponsive } from './middleware';
import { swaggerUiOptions } from './config/swagger/swagger';

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

const server = express();

// Permiso a conexiones - CORS
const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (origin === process.env.FRONTEND_URL || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Error de CORS'));
		}
	},
};
server.use(cors(corsOptions));

// Leer datos de formulario
server.use(express.json());

// Añadir morgan para visualizar solicitudes
server.use(morgan('dev'));

// Archivos estáticos
server.use(express.static('public'));
server.use('/swagger.css', express.static(path.join(__dirname, 'config/swagger/swagger.css')));

// Routing
server.use('/api/products', router);

// Documentación
const swaggerDocument = yamljs.load(path.join(__dirname, 'config/swagger/swagger.yaml'));
server.use('/docs', addMetaResponsive, swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerUiOptions));

export default server;
