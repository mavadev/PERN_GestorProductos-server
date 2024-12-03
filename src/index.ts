const PORT = 4000;
import server from './server';

server.listen(PORT, () => {
	console.log(`-> Server corriendo en http://localhost:${PORT}`);
});
