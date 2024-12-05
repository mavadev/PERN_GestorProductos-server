import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateErrors = (req: Request, res: Response, next: NextFunction) => {
	// Validacion
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
		return;
	}

	next();
};
