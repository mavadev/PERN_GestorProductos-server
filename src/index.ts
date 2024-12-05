import colors from 'colors';
import server from './server';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
	// Conexión a la base de datos
	connectDatabase();
	console.log(colors.cyan.bold(`Server activo en puerto ${PORT}`));
});
