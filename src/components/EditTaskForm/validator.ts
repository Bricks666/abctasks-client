import Joi from 'joi';
import { UpdateTaskFormValues } from './EditTaskForm';

export const validatingScheme = Joi.object<UpdateTaskFormValues>({
	content: Joi.string().max(128).required().messages({
		'string.empty': "Content can't be empty",
		'string.max': 'Content must be less than 128',
	}),
	groupId: Joi.number().required().messages({
		'number.empty': 'Group must be choose',
	}),
	status: Joi.string().required().messages({
		'string.empty': 'Status must be choose',
	}),
});
