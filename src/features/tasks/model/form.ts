import { createDomain } from 'effector';
import { createForm } from 'effector-forms';
import Joi from 'joi';
import { Task } from '@/shared/api';
import { allowedSymbolsRegExp } from '@/shared/configs';
import { createRuleFromSchema } from '@/shared/lib';

const taskFormDomain = createDomain();

export interface TaskFormValues
	extends Pick<Task, 'title' | 'description' | 'status' | 'tagIds'> {}

const schemas = {
	tagIds: Joi.number().required().messages({
		'number.empty': 'Tag must be choose',
		'number.positive': 'Tag must be choose',
	}),
	status: Joi.string().required(),
	title: Joi.string()
		.pattern(allowedSymbolsRegExp)
		.max(128)
		.required()
		.messages({
			'string.empty': "Content can't be empty",
			'string.max': 'Content can be less than 128',
			'string.pattern.base':
				'Content can only contain latins alphas, numeric and !, *, (, ), _, +',
		}),
};

export const form = createForm<TaskFormValues>({
	fields: {
		title: {
			init: '',
			rules: [createRuleFromSchema('title', schemas.title)],
		},
		description: {
			init: '',
			rules: [createRuleFromSchema('description', schemas.title)],
		},
		tagIds: {
			init: [],
			rules: [createRuleFromSchema('tagIds', schemas.tagIds)],
		},
		status: {
			init: 'ready',
			rules: [createRuleFromSchema('states', schemas.status)],
		},
	},
	domain: taskFormDomain,
});