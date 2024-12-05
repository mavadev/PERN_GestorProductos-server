import request from 'supertest';
import server from '../../server';

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
			name: 'Producto prueba',
			price: 100.3,
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
