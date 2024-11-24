import { createForm } from 'effector-forms';
import Joi from 'joi';

import { Task } from '@/shared/api';
import { createRuleFromSchema } from '@/shared/lib';

export interface TaskFormValues
	extends Pick<Task, 'title' | 'description' | 'status'> {
	readonly tagIds: number[];
}

/**
 * @todo Use error messages from translations
 */
const schemas = {
	tagIds: Joi.array().items(Joi.number()).min(1).required().messages({
		'array.min': 'At least one tag must be chosen',
	}),
	status: Joi.string().required(),
	title: Joi.string().max(128).required().messages({
		'string.empty': "Title can't be empty",
		'string.max': 'Title can be less than 128',
	}),
};

export const create = () => {
	return createForm<TaskFormValues>({
		fields: {
			title: {
				init: '',
				rules: [createRuleFromSchema('title', schemas.title)],
			},
			description: {
				init: '',
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
