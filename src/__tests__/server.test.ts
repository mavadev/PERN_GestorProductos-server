import request from 'supertest';
import server from '../server';

describe('GET /api', () => {
	test('Debe responder con un JSON', async () => {
		const res = await request(server).get('/api');

		// Debe cumplirse
		expect(res.status).toBe(200);
		expect(res.type).toMatch('json');

		// No debe cumplirse
		expect(res.status).not.toBe(404);
		expect(res.body.msg).not.toBeNull();
	});
});
