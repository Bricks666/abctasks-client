import { createForm } from 'effector-forms';
import Joi from 'joi';

import { Task } from '@/shared/api';
import { allowedSymbolsRegExp } from '@/shared/configs';
import { createRuleFromSchema } from '@/shared/lib';

export interface TaskFormValues
	extends Pick<Task, 'title' | 'description' | 'status'> {
	readonly tagIds: number[];
}

const schemas = {
	tagIds: Joi.array().items(Joi.number()).required().messages({
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

export const createTaskForm = () => {
	return createForm<TaskFormValues>({
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
				rules: [createRuleFromSchema('status', schemas.status)],
			},
		},
	});
};
