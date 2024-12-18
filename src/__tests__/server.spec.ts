import request from 'supertest';
import database from '../config/database';
import server, { connectDatabase } from '../server';

jest.mock('../config/database');

describe('connection to the database', () => {
	it('debe manejar el error en la conexión', async () => {
		// Preparar
		const mockAuth = jest.spyOn(database, 'authenticate').mockRejectedValueOnce(new Error('Error'));
		const consoleSpy = jest.spyOn(console, 'log');

		// Actuar
		await connectDatabase();

		// Afirmar
		expect(mockAuth).toHaveBeenCalledTimes(1);
		expect(consoleSpy).toHaveBeenCalledTimes(1);
		expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('error'));

		// Limpiar mocks
		mockAuth.mockRestore();
		consoleSpy.mockRestore();
	});

	it('debe realizar la conexión correctamente', async () => {
		// Preparar
		const mockAuth = jest.spyOn(database, 'authenticate');
		const mockSync = jest.spyOn(database, 'sync');
		const consoleSpy = jest.spyOn(console, 'log');

		// Actuar
		await connectDatabase();

		// Afirmar
		expect(mockAuth).toHaveBeenCalledTimes(1);
		expect(mockSync).toHaveBeenCalledTimes(1);
		expect(consoleSpy).toHaveBeenCalledTimes(1);
		expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('exitosa'));

		// Limpiar mocks
		mockAuth.mockRestore();
		consoleSpy.mockRestore();
	});
});

describe('responsive meta tag in docs', () => {
	it('debe agregar el meta tag de responsividad a la página /docs', async () => {
		// Actuar
		const response = await request(server).get('/docs/');

		// Afirmar
		expect(response.status).toBe(200);
		expect(response.text).toContain(
			'<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></head>'
		);
	});
});
