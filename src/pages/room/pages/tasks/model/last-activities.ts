import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import {
	createTaskModel,
	removeTaskModel,
	updateTaskModel
} from '@/features/tasks';
import {
	activityActionsModel,
	activitySpheresModel
} from '@/entities/activities';
import { Activity, activitiesApi, activity } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import {
	InRoomParams,
	StandardResponse,
	PaginationResponse,
	getStandardResponse,
	getPaginationResponse
} from '@/shared/types';
import { currentRoute, loadedWithRouteState } from './page';

const activitiesDomain = createDomain();
const handlerFx = activitiesDomain.effect<
	InRoomParams,
	StandardResponse<PaginationResponse<Activity>>
>(({ roomId, }) => activitiesApi.getAll({ roomId, count: 5, }));

export const query = createQuery<
	InRoomParams,
	StandardResponse<PaginationResponse<Activity>>,
	Error,
	StandardResponse<PaginationResponse<Activity>>,
	PaginationResponse<Activity>
>({
	initialData: { items: [], totalCount: 0, limit: 5, },
	effect: handlerFx,
	contract: runtypeContract(
		getStandardResponse(getPaginationResponse(activity))
	),
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
	clock: [currentRoute.opened, currentRoute.updated, loadedWithRouteState],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: query.start,
});

sample({
	clock: query.start,
	target: [activityActionsModel.query.start, activitySpheresModel.query.start],
});
