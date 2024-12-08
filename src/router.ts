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
 *      example: 750
 *     availability:
 *      type: boolean
 *      description: The Product Availability
 *      example: true
 *   ResponseProduct:
 *    type: object
 *    properties:
 *     data:
 *      $ref: '#/components/schemas/Product'
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
 *        type: object
 *        properties:
 *         data:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *   summary: Get a product by ID
 *   tags:
 *    - Products
 *   description: Return a product based on its unique ID
 *   parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Successful response
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ResponseProduct'
 *    400:
 *     description: Bad Request - Invalid ID
 *    404:
 *     description: Not Found
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         error:
 *          type: string
 *          description: Error Message
 *          example: Producto no encontrado
 */
router.get(
	'/:id',
	param('id')
		.isInt()
		.custom(id => id > 0)
		.withMessage('ID no válido'),
	validateErrors,
	getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *   summary: Create a new product
 *   tags:
 *   - Products
 *   description: Returns a new product in the database
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         example: Impresora EPSON L4260
 *        price:
 *         type: number
 *         example: 1000
 *   responses:
 *    201:
 *     description: Created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ResponseProduct'
 *    400:
 *     description: Bad Request - Invalid Body
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *   summary: Update a product
 *   tags:
 *   - Products
 *   description: Return the updated product
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: The ID of the product
 *      schema:
 *       type: integer
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         example: Updated Name
 *        price:
 *         type: number
 *         example: 1200
 *        availability:
 *         type: boolean
 *         example: false
 *   responses:
 *    200:
 *     description: Updated
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ResponseProduct'
 *    400:
 *     description: Bad Request - Invalid Body
 *    404:
 *     description: Not Found
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         error:
 *          type: string
 *          description: Error Message
 *          example: Producto no encontrado
 */
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
