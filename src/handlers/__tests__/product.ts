import request from 'supertest';
import server from '../../server';

beforeAll(async () => {
	await request(server).delete('/api/products');
});

describe('POST /api/products', () => {
	it('debe mostrar errores si no se envia el producto', async () => {
		// Actuar
		const response = await request(server).post('/api/products').send({});

		// Afirmar
		expect(response.status).toEqual(400);
		expect(response.body).toHaveProperty('errors');
		expect(response.body.errors.length).toBeGreaterThan(0);

		expect(response.status).not.toEqual(201);
		expect(response.body).not.toHaveProperty('data');
	});

	it('debe crear un nuevo producto', async () => {
		// Organizar
		const newProduct = {
			name: 'Producto - Testing',
			price: 333.3,
		};

		// Actuar
		const response = await request(server).post('/api/products').send(newProduct);

		// Afirmar
		expect(response.status).toEqual(201);
		expect(response.body).toHaveProperty('data');

		expect(response.status).not.toEqual(400);
		expect(response.body).not.toHaveProperty('errors');
		expect(response.body.data).not.toBeNull();
	});
});

describe('GET /api/products', () => {
	it('debe validar que la url api/products exista', async () => {
		const response = await request(server).get('/api/products');
		expect(response.status).not.toEqual(400);
	});

	it('debe responder un JSON con los productos', async () => {
		// Actuar
		const response = await request(server).get('/api/products');

		// Afirmar
		expect(response.status).toEqual(200);
		expect(response.body).toHaveProperty('data');
		expect(response.body.data).toHaveLength(1);
		expect(response.type).toMatch('json');

		expect(response.status).not.toEqual(400);
		expect(response.body).not.toHaveProperty('errors');
	});
});
