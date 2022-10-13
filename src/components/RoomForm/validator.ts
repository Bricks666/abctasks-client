import Joi from 'joi';
import { CreateUpdateRoomRequest } from '@/models/rooms';

export const validatingScheme = Joi.object<CreateUpdateRoomRequest>({
	id: Joi.number().required(),
	name: Joi.string().max(32).required().messages({
		'string.empty': "Room name can't be empty",
		'string.max': 'Room name must be less 32 characters',
	}),
	description: Joi.string().max(32).messages({
		'string.max': 'Room name must be less 32 characters',
	}),
});
