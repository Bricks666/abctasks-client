import { createForm } from 'effector-forms';
import Joi from 'joi';

import { Room } from '@/shared/api';
import { createRuleFromSchema } from '@/shared/lib';

export interface RoomFormValues extends Pick<Room, 'description' | 'name'> {}

const schemas = {
	name: Joi.string().max(32).required().messages({
		'string.empty': "Room name can't be empty",
		'string.max': 'Room name must be less 32 characters',
	}),
	description: Joi.string().max(32).messages({
		'string.max': 'Room name must be less 32 characters',
	}),
};

export const create = () => {
	return createForm<RoomFormValues>({
		fields: {
			name: {
				init: '',
				rules: [createRuleFromSchema('name', schemas.name)],
			},
			description: {
				init: '',
				rules: [createRuleFromSchema('description', schemas.description)],
			},
		},
	});
};
