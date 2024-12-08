import request from 'supertest';
import server from '../../server';

beforeAll(async () => {
	await request(server).delete('/api/products');
});

describe('POST /api/products', () => {
	it('debe mostrar errores si no se envía el producto', async () => {
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

	it('debe validar si se envía un ID no válido', async () => {
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

describe('PUT /api/products/:id', () => {
	// Preparar
	const updatedData = {
		name: 'Producto Actualizado - Testing',
		price: 1000,
		availability: false,
	};

	it('debe validar si no se envía el producto a actualizar', async () => {
		// Actuar
		const response = await request(server).put('/api/products/1').send({});

		// Afirmar
		expect(response.status).toEqual(400);
		expect(response.body).toHaveProperty('errors');
		expect(response.body.errors.length).toBeGreaterThan(0);

		expect(response.status).not.toEqual(200);
		expect(response.body).not.toHaveProperty('data');
	});

	it('debe validar si no existe el producto con el ID', async () => {
		// Actuar
		const response = await request(server).put('/api/products/5').send(updatedData);

		// Afirmar
		expect(response.status).toEqual(404);
		expect(response.body).toHaveProperty('error');
		expect(response.body.error).toBeTruthy();

		expect(response.status).not.toEqual(200);
		expect(response.body).not.toHaveProperty('data');
	});

	it('debe actualizar la información de un producto', async () => {
		// Actuar
		const response = await request(server).put('/api/products/1').send(updatedData);

		// Afirmar
		expect(response.status).toEqual(200);
		expect(response.body).toHaveProperty('data');
		expect(response.body.data).toMatchObject(updatedData);

		expect(response.status).not.toEqual(404);
		expect(response.body).not.toHaveProperty('error');
		expect(response.body.data).not.toBeNull();
	});
});

describe('PATCH AVAILABILITY /api/products/:id', () => {
	it('debe actualizar la disponibilidad de un producto existente', async () => {
		// Actuar
		const product = await request(server).get('/api/products/1');
		const updated = await request(server).patch('/api/products/1');

		// Afirmar
		expect(updated.status).toEqual(200);
		expect(updated.body).toHaveProperty('data');
		expect(updated.body.data).toBeTruthy();
		expect(updated.body.data.availability).toEqual(!product.body.data.availability);

		expect(updated.status).not.toEqual(404);
		expect(updated.body).not.toHaveProperty('error');
		expect(updated.body.data).not.toBeNull();
	});

	it('debe validar que se envíe un id válido', async () => {
		// Actuar
		const response = await request(server).patch('/api/products/not-valid-url');

		// Afirmar
		expect(response.status).toEqual(400);
		expect(response.body).toHaveProperty('errors');
		expect(response.body.errors.length).toBeGreaterThan(0);

		expect(response.status).not.toEqual(200);
		expect(response.body).not.toHaveProperty('data');
	});

	it('debe validar si no se encuentra el producto a actualizar', async () => {
		// Actuar
		const response = await request(server).patch('/api/products/5');

		// Afirmar
		expect(response.status).toEqual(404);
		expect(response.body).toHaveProperty('error');
		expect(response.body.error).toBeTruthy();

		expect(response.status).not.toEqual(400);
		expect(response.body).not.toHaveProperty('data');
	});
});

describe('DELETE BY ID /api/products/:id', () => {
	it('debe validar que se envíe un id válido', async () => {
		// Actuar
		const response = await request(server).delete('/api/products/not-valid-url');

		// Afirmar
		expect(response.status).toEqual(400);
		expect(response.body).toHaveProperty('errors');
		expect(response.body.errors).toBeTruthy();

		expect(response.status).not.toEqual(200);
		expect(response.body).not.toHaveProperty('data');
	});

	it('debe validar que exista el producto a eliminar', async () => {
		// Actuar
		const response = await request(server).delete('/api/products/5');

		// Afirmar
		expect(response.status).toEqual(404);
		expect(response.body).toHaveProperty('error');
		expect(response.body.error).toBeTruthy();

		expect(response.status).not.toEqual(200);
		expect(response.body).not.toHaveProperty('data');
	});

	it('debe eliminar el producto con el id enviado', async () => {
		// Actuar
		const response = await request(server).delete('/api/products/1');

		// Afirmar
		expect(response.status).toEqual(200);
		expect(response.body).toHaveProperty('data');
		expect(response.body.data).toBeTruthy();

		expect(response.status).not.toEqual(404);
		expect(response.body).not.toHaveProperty('error');
	});
});

describe('DELETE /api/products/', () => {
	it('debe eliminar todos los productos', async () => {
		// Actuar
		const response = await request(server).delete('/api/products/');

		// Afirmar
		expect(response.status).toEqual(200);
		expect(response.body).toHaveProperty('data');
		expect(response.body.data).toBeTruthy();
	});
});
