import { createForm } from 'effector-forms';
import Joi from 'joi';

import { Room } from '@/shared/api';
import {
	MAX_LONG_LENGTH,
	MAX_SHORT_LENGTH,
	MIN_LENGTH
} from '@/shared/configs';
import { createRuleFromSchema } from '@/shared/lib';

export interface RoomFormValues extends Pick<Room, 'description' | 'name'> {}

const schemas = {
	name: Joi.string().min(MIN_LENGTH).max(MAX_SHORT_LENGTH).required().messages({
		'string.empty': 'empty',
		'string.min': 'min_length',
		'string.max': 'max_length',
	}),
	description: Joi.string().max(MAX_LONG_LENGTH).messages({
		'string.max': 'max_length',
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
