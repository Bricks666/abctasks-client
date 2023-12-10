import { InRoomParams, StandardResponse } from '@/shared/types';

import { instance } from '../request';

import { Progress } from './types';

export const getAll = async ({ roomId, }: InRoomParams) => {
	return instance
		.get(`progress/${roomId}`)
		.json<StandardResponse<Progress[]>>();
};
