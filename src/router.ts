import { Router } from 'express';
import { body } from 'express-validator';
import { validateErrors } from './middleware';
import { getProducts, createProduct } from './handlers/product';

const router = Router();

router.get('/', getProducts);

router.post(
	'/',
	body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacío'),
	body('price')
		.notEmpty()
		.withMessage('Debe indicar un precio para el producto')
		.isNumeric()
		.custom(value => value > 0)
		.withMessage('Valor de precio no válido'),
	validateErrors,
	createProduct
);

export default router;
