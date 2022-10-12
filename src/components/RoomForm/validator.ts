import Joi from 'joi';
import { CreateEditRoomRequest } from '@/types/requests';

export const validatingScheme = Joi.object<CreateEditRoomRequest>({
	roomId: Joi.number().required(),
	roomName: Joi.string().max(32).required().messages({
		'string.empty': "Room name can't be empty",
		'string.max': 'Room name must be less 32 characters',
	}),
	roomDescription: Joi.string().max(32).messages({
		'string.max': 'Room name must be less 32 characters',
	}),
});
