import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const createProduct = async (req: Request, res: Response) => {
	// Creación de Producto en DB
	const product = await Product.create(req.body);
	// Mostrar producto creado en respuesta
	res.json({ data: product });
};
