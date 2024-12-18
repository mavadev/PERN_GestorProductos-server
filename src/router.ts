import { Router } from 'express';
import { body, param } from 'express-validator';
import { validateErrors } from './middleware';
import {
	getProductById,
	getProducts,
	createProduct,
	updateProduct,
	updateAvailability,
	deleteProduct,
	deleteProducts,
} from './handlers/product';

const router = Router();

router.get('/', getProducts);

router.get(
	'/:id',
	param('id')
		.isInt()
		.custom(id => id > 0)
		.withMessage('ID no válido'),
	validateErrors,
	getProductById
);

router.post(
	'/',
	body('name').trim().notEmpty().withMessage('Debes ingresar el nombre del producto'),
	body('price').isFloat({ gt: 0 }).withMessage('Debes ingresar un precio válido'),
	validateErrors,
	createProduct
);

router.put(
	'/:id',
	param('id')
		.isInt()
		.custom(id => id > 0)
		.withMessage('ID no válido'),
	body('name').notEmpty().withMessage('Debes ingresar el nombre del producto'),
	body('price')
		.notEmpty()
		.isNumeric()
		.custom(value => value > 0)
		.withMessage('Debes indicar un precio válido'),
	body('availability').isBoolean().withMessage('Debes indicar la disponibilidad'),
	validateErrors,
	updateProduct
);

router.patch(
	'/:id',
	param('id')
		.isInt()
		.custom(id => id > 0)
		.withMessage('ID no válido'),
	validateErrors,
	updateAvailability
);

router.delete(
	'/:id',
	param('id')
		.isInt()
		.custom(id => id > 0)
		.withMessage('ID no válido'),
	validateErrors,
	deleteProduct
);

router.delete('/', deleteProducts);

export default router;
