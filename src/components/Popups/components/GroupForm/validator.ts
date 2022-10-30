import Joi from 'joi';
import { forms } from '@/const';
import { GroupFormValues } from './types';

const colorPattern = /#[0-9a-fA-F]{6}/;

export const validatingScheme = Joi.object<GroupFormValues>({
	mainColor: Joi.string().pattern(colorPattern).required().messages({
		'string.empty': "Color can't be empty",
		'string.pattern.base': 'Color must be #XXXXXX, for example #ff00aa',
	}),
	secondColor: Joi.string().pattern(colorPattern).required().messages({
		'string.empty': "Color can't be empty",
		'string.pattern.base': 'Color must be #XXXXXX, for example #ff00aa',
	}),
	name: Joi.string().pattern(forms.allowedSymbolsRegExp).required().messages({
		'string.empty': "Name can't be empty",
		'string.pattern.base':
			'Name can only contain latins alphas, numeric and !, *, (, ), _, +',
	}),
});
