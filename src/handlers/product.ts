import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const createProduct = async (req: Request, res: Response) => {
	// Creación de Producto (sin ID)
	const product = new Product(req.body);
	// Guardar base de datos (con ID en base de datos)
	const savedProduct = await product.save();
	// Mostrar en respuesta
	res.json({ data: savedProduct });
};
