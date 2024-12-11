import { SwaggerUiOptions } from 'swagger-ui-express';

// Configuration Page Documentation
export const swaggerUiOptions: SwaggerUiOptions = {
	customCssUrl: '/swagger.css',
	customfavIcon: '/favicon.png',
	customSiteTitle: 'REST API de Productos - Documentación',
	swaggerOptions: {
		defaultModelsExpandDepth: -1,
	},
};

export default swaggerUiOptions;
