import colors from 'colors';
import server, { connectDatabase } from './server';

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
	connectDatabase();
	console.log(colors.cyan.bold(`Server activo en puerto ${PORT}`));
});
