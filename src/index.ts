import colors from 'colors';
import server, { connectDatabase } from './server';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
	connectDatabase();
	console.log(colors.cyan.bold(`Server activo en puerto ${PORT}`));
});
