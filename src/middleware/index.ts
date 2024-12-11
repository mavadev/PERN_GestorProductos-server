import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateErrors = (req: Request, res: Response, next: NextFunction) => {
	// Validación
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
		return;
	}

	next();
};

export const addMetaResponsive = (req: Request, res: Response, next: NextFunction): void => {
	res.setHeader('Content-Type', 'text/html');
	const originalSend = res.send.bind(res);

	res.send = (body: any): Response => {
		if (typeof body === 'string') {
			body = body.replace(
				'</head>',
				'<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></head>'
			);
		}
		return originalSend(body);
	};

	next();
};
