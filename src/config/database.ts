import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const database = new Sequelize(process.env.DATABASE_URL);

export async function connectDatabase() {
	try {
		await database.authenticate();
		database.sync();
		console.log('Database conectado correctamente');
	} catch (error) {
		console.log(error);
	}
}

export default database;
