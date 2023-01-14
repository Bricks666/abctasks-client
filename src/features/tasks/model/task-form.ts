import { createDomain } from 'effector';
import { createForm } from 'effector-forms';
import Joi from 'joi';
import { Task } from '@/shared/api';
import { allowedSymbolsRegExp } from '@/shared/configs';
import { createRuleFromSchema } from '@/shared/lib';

const taskFormDomain = createDomain();

export interface TaskFormValues
	extends Pick<Task, 'content' | 'status' | 'groupId'> {}

const schemas = {
	groupId: Joi.number().required().messages({
		'number.empty': 'Group must be choose',
		'number.positive': 'Group must be choose',
	}),
	status: Joi.string().required(),
	content: Joi.string()
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
		content: {
			init: '',
			rules: [createRuleFromSchema('content', schemas.content)],
		},
		groupId: {
			init: 0,
			rules: [createRuleFromSchema('groupId', schemas.groupId)],
		},
		status: {
			init: 'ready',
			rules: [createRuleFromSchema('states', schemas.status)],
		},
	},
	domain: taskFormDomain,
});
