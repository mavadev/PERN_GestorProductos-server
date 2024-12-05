import { Router } from 'express';
import { body, param } from 'express-validator';
import { validateErrors } from './middleware';
import { getProductById, getProducts, createProduct } from './handlers/product';

const router = Router();

// Obtener producto por ID
router.get('/:id', param('id').isInt().withMessage('ID no válido'), validateErrors, getProductById);

// Obtener todos los productos
router.get('/', getProducts);

// Crear Producto
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
