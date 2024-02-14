import { cache, createQuery, keepFresh } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { interval } from 'patronum';
import { Array } from 'runtypes';

import { membersApi, user, User } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import {
	getStandardResponse,
	InRoomParams,
	StandardResponse
} from '@/shared/types';

const usersInRoom = createDomain();

const handlerFx = usersInRoom.effect(membersApi.getAll);

export const query = createQuery<
	InRoomParams,
	StandardResponse<User[]>,
	Error,
	StandardResponse<User[]>,
	User[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(user))),
	mapData: dataExtractor,
});

export const $ids = query.$data.map((users) => users.map((user) => user.id));
export const $count = query.$data.map((users) => users.length);
export const $hasError = query.$error.map((error) => !!error);

cache(query);

keepFresh(query, {
	triggers: [interval({ timeout: 5000, })],
});
