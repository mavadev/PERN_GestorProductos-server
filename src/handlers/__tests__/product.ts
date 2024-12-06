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
		// Preparar (Arrange)
		const newProduct = {
			name: 'Producto - Testing',
			price: 333.3,
		};

		// Actuar (Act)
		const response = await request(server).post('/api/products').send(newProduct);

		// Afirmar (Assert)
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
		expect(response.body.data).toHaveLength(1); // TEST DE POST

		expect(response.status).toEqual(200);
		expect(response.body).toHaveProperty('data');
		expect(response.type).toMatch('json');

		expect(response.status).not.toEqual(400);
		expect(response.body).not.toHaveProperty('errors');
	});
});

describe('GET BY ID /api/products', () => {
	it('debe responder con el producto en JSON', async () => {
		// Actuar
		const response = await request(server).get('/api/products/1');

		// Afirmar
		expect(response.status).toEqual(200);
		expect(response.body).toHaveProperty('data');
		expect(response.type).toMatch('json');

		expect(response.status).not.toEqual(400);
		expect(response.body).not.toHaveProperty('errors');
		expect(response.body.data).not.toBeNull();
	});

	it('debe validar si no se encuentra el producto', async () => {
		// Actuar
		const response = await request(server).get('/api/products/5');

		// Afirmar
		expect(response.status).toEqual(404);
		expect(response.body).toHaveProperty('error');

		expect(response.body.error).not.toBeNull();
		expect(response.status).not.toEqual(200);
		expect(response.body).not.toHaveProperty('data');
	});

	it('debe validar si se envia un ID no válido', async () => {
		// Actuar
		const response = await request(server).get('/api/products/noValido');

		// Afirmar
		expect(response.status).toEqual(400);
		expect(response.body).toHaveProperty('errors');
		expect(response.body.errors.length).toBeGreaterThan(0);

		expect(response.status).not.toEqual(200);
		expect(response.body).not.toHaveProperty('data');
	});
});
