import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProductById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);

		if (!product) {
			res.status(404).json({ error: `Producto no encontrado (ID: ${id})` });
			return;
		}

		res.json({ data: product });
	} catch (error) {
		console.error(error);
	}
};

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.findAll({
			order: [['id', 'ASC']],
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
		});
		res.json({ data: products });
	} catch (error) {
		console.error(error);
	}
};

export const createProduct = async (req: Request, res: Response) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json({ data: product });
	} catch (error) {
		console.error(error);
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	try {
		// Obtener producto a actualizar
		const { id } = req.params;
		const product = await Product.findByPk(id);
		// Validación
		if (!product) {
			res.status(404).json({ error: `Producto no encontrado (ID: ${id})` });
			return;
		}
		// Actualizar Producto
		await product.update(req.body);
		await product.save();

		res.json({ data: product });
	} catch (error) {
		console.error(error);
	}
};

export const updateAvailability = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);

		if (!product) {
			res.status(404).json({ error: `Producto no encontrado (ID: ${id})` });
			return;
		}

		product.availability = !product.dataValues.availability;
		await product.save();

		res.json({ data: product });
	} catch (error) {
		console.error(error);
	}
};

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);

		if (!product) {
			res.status(404).json({ error: `Producto no encontrado (ID: ${id})` });
			return;
		}

		await product.destroy();
		await product.save();

		res.json({ data: `Producto eliminado (ID: ${id})` });
	} catch (error) {
		console.error(error);
	}
};
