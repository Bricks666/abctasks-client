import Joi from 'joi';
import { RegistrationRequest } from '@/shared/api';
import {
	allowedSymbolsRegExp,
	maxLoginPasswordLength,
	minLoginPasswordLength
} from '@/shared/configs';

export const validationSchema = Joi.object<RegistrationRequest>({
	login: Joi.string()
		.pattern(allowedSymbolsRegExp)
		.min(minLoginPasswordLength)
		.max(maxLoginPasswordLength)
		.required()
		.messages({
			'string.empty': 'Login must be provided',
			'string.pattern.base':
				'Login can only contain latins alphas, numeric and !, *, (, ), _, +',
			'string.min': `Login must contain minimum ${minLoginPasswordLength} symbols`,
			'string.max': `Login must contain maximum ${maxLoginPasswordLength} symbols`,
		}),
	password: Joi.string()
		.pattern(allowedSymbolsRegExp)
		.min(minLoginPasswordLength)
		.max(maxLoginPasswordLength)
		.required()
		.messages({
			'string.empty': 'Password must be provided',
			'string.pattern.base':
				'Password can only contain latins alphas, numeric and !, *, (, ), _, +',
			'string.min': `Password must contain minimum ${minLoginPasswordLength} symbols`,
			'string.max': `Password must contain maximum ${maxLoginPasswordLength} symbols`,
		}),
	repeatPassword: Joi.string().valid(Joi.ref('password')).messages({
		'any.only': 'Password must be equal',
	}),
});
