import Joi from 'joi';
import { RoomFormValues } from './types';

export const validatingScheme = Joi.object<RoomFormValues>({
	name: Joi.string().max(32).required().messages({
		'string.empty': "Room name can't be empty",
		'string.max': 'Room name must be less 32 characters',
	}),
	description: Joi.string().max(32).messages({
		'string.max': 'Room name must be less 32 characters',
	}),
});
