import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { GetGroupParams, Group, group, groupsApi } from '@/shared/api';
import { dataExtractor, StandardFailError } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';

const groupDomain = createDomain();

const handlerFx = groupDomain.effect<
	GetGroupParams,
	StandardResponse<Group>,
	StandardFailError
>(groupsApi.getOne);

export const query = createQuery<
	GetGroupParams,
	StandardResponse<Group>,
	StandardFailError,
	StandardResponse<Group>,
	Group
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(group)),
	mapData: dataExtractor,
});

export const Gate = createGate<GetGroupParams>();

sample({
	clock: Gate.open,
	target: query.start,
});

sample({
	clock: Gate.close,
	target: query.reset,
});
