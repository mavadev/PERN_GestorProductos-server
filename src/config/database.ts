import { Sequelize } from 'sequelize-typescript';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();

const database = new Sequelize(process.env.DATABASE_URL!, {
	models: [__dirname + '/../models/**/*.ts'],
});

export async function connectDatabase() {
	try {
		await database.authenticate();
		database.sync();
		console.log(colors.blue.bold('Conexión existosa a la DB'));
	} catch (error) {
		console.log(colors.red.bold('Hubo un error al conectarse a la DB'));
	}
}

export default database;
