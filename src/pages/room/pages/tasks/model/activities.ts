import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import {
	createTaskModel,
	removeTaskModel,
	updateTaskModel
} from '@/features/tasks';
import { Activity, activitiesApi, activity } from '@/shared/api';
import { routes } from '@/shared/configs';
import { dataExtractor } from '@/shared/lib';
import {
	InRoomParams,
	StandardResponse,
	ItemsResponse,
	getStandardResponse,
	getItemsResponse
} from '@/shared/types';
import { loadedWithRouteState } from './page';

const activitiesDomain = createDomain();
const handlerFx = activitiesDomain.effect<
	InRoomParams,
	StandardResponse<ItemsResponse<Activity>>
>(({ roomId, }) => activitiesApi.getLast({ roomId, count: 5, }));

export const query = createQuery<
	InRoomParams,
	StandardResponse<ItemsResponse<Activity>>,
	Error,
	StandardResponse<ItemsResponse<Activity>>,
	ItemsResponse<Activity>
>({
	initialData: { items: [], totalCount: 0, limit: 5, },
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(getItemsResponse(activity))),
	mapData: dataExtractor,
});

cache(query);

sample({
	clock: [
		createTaskModel.mutation.finished.success,
		removeTaskModel.mutation.finished.success,
		updateTaskModel.mutation.finished.success
	],
	fn: ({ params, }) => ({ roomId: params.roomId, }),
	target: query.start,
});

sample({
	clock: [routes.room.tasks.opened, loadedWithRouteState],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: query.start,
});
