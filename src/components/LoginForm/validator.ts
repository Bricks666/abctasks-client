import Joi from 'joi';
import { forms } from '@/const';
import { LoginRequest } from '@/api';

export const validationSchema = Joi.object<LoginRequest>({
	login: Joi.string()
		.pattern(forms.allowedSymbolsRegExp)
		.min(forms.MIN_LOGIN_PASSWORD_LENGTH)
		.max(forms.MAX_LOGIN_PASSWORD_LENGTH)
		.required()
		.messages({
			'string.empty': 'Login must be provided',
			'string.pattern.base':
				'Login can only contain latins alphas, numeric and !, *, (, ), _, +',
			'string.min': `Login must contain minimum ${forms.MIN_LOGIN_PASSWORD_LENGTH} symbols`,
			'string.max': `Login must contain maximum ${forms.MAX_LOGIN_PASSWORD_LENGTH} symbols`,
		}),
	password: Joi.string()
		.pattern(forms.allowedSymbolsRegExp)
		.min(forms.MIN_LOGIN_PASSWORD_LENGTH)
		.max(forms.MAX_LOGIN_PASSWORD_LENGTH)
		.required()
		.messages({
			'string.empty': 'Password must be provided',
			'string.pattern.base':
				'Password can only contain latins alphas, numeric and !, *, (, ), _, +',
			'string.min': `Password must contain minimum ${forms.MIN_LOGIN_PASSWORD_LENGTH} symbols`,
			'string.max': `Password must contain maximum ${forms.MAX_LOGIN_PASSWORD_LENGTH} symbols`,
		}),
	rememberMe: Joi.boolean(),
});
