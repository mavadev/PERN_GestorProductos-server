import request from 'supertest';
import server, { connectDatabase } from '../server';
import database from '../config/database';

describe('GET /api', () => {
	test('debe responder con un JSON', async () => {
		const res = await request(server).get('/api');

		// Debe cumplirse
		expect(res.status).toBe(200);
		expect(res.type).toMatch('json');

		// No debe cumplirse
		expect(res.status).not.toBe(404);
		expect(res.body.msg).not.toBeNull();
	});
});

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
