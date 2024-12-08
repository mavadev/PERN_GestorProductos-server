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
/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: The Product ID
 *      example: 1
 *     name:
 *      type: string
 *      description: The Product Name
 *      example: Monitor Gamer
 *     price:
 *      type: number
 *      description: The Product Price
 *      example: 350
 *     availability:
 *      type: boolean
 *      description: The Product Availability
 *      example: true/false
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *   summary: Get a list of products
 *   tags:
 *    - Products
 *   description: Return a list of products
 *   responses:
 *    200:
 *     description: Successful response
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Product'
 */
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
	body('name').notEmpty().withMessage('Debes ingresar el nombre del producto'),
	body('price')
		.notEmpty()
		.isNumeric()
		.custom(value => value > 0)
		.withMessage('Debes ingresar un precio válido'),
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
