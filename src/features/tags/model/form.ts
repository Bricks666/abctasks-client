import { createDomain } from 'effector';
import { createForm } from 'effector-forms';
import Joi from 'joi';

import { Tag } from '@/shared/api';
import { allowedSymbolsRegExp } from '@/shared/configs';
import { createRuleFromSchema } from '@/shared/lib';

const tagFormDomain = createDomain();

export interface TagFormValues extends Omit<Tag, 'id' | 'roomId'> {}

const colorPattern = /#[0-9a-fA-F]{6}/;

const schemas = {
	mainColor: Joi.string().pattern(colorPattern).required().messages({
		'string.empty': "Color can't be empty",
		'string.pattern.base': 'Color must be #XXXXXX, for example #ff00aa',
	}),
	secondColor: Joi.string().pattern(colorPattern).required().messages({
		'string.empty': "Color can't be empty",
		'string.pattern.base': 'Color must be #XXXXXX, for example #ff00aa',
	}),
	name: Joi.string().pattern(allowedSymbolsRegExp).required().messages({
		'string.empty': "Name can't be empty",
		'string.pattern.base':
			'Name can only contain latins alphas, numeric and !, *, (, ), _, +',
	}),
};

export const form = createForm<TagFormValues>({
	fields: {
		name: {
			init: 'Name',
			rules: [createRuleFromSchema('name', schemas.name)],
		},
		mainColor: {
			init: '#ffffff',
			rules: [createRuleFromSchema('mainColor', schemas.mainColor)],
		},
		secondColor: {
			init: '#000000',
			rules: [createRuleFromSchema('secondColor', schemas.secondColor)],
		},
	},
	domain: tagFormDomain,
});
