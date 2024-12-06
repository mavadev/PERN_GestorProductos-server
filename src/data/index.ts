import { exit } from 'node:process';
import database from '../config/database';
import colors from 'colors';

export const clearDatabase = async () => {
	try {
		await database.sync({ force: true });
		console.log(colors.cyan.bold('Datos eliminados correctamente'));
		exit(0);
	} catch (error) {
		console.error(error);
		exit(1);
	}
};

if (process.argv[2] == '--clear') {
	clearDatabase();
}
