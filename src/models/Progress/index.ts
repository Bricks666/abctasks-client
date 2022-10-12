/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { SubscribeChangeProgressProps } from '@/api/progress';
import { ID, WithCloseRef } from '@/types/common';
import {
	ChangeProgressResponse,
	TasksProgressResponse,
} from '@/types/response';
import { TaskProgressStructure } from './types';

export const ProgressDomain = createDomain('ProgressDomain');

export const $TasksProgress = ProgressDomain.store<TaskProgressStructure[]>(
	[],
	{
		name: 'TasksProgress',
	}
);
export const $LoadingTasksProgress = ProgressDomain.store<boolean>(false, {
	name: 'LoadingTasksProgress',
});

export const loadTasksProgressFx = ProgressDomain.effect<
	ID,
	TasksProgressResponse
>('loadTasksProgress');
export const subscribeChangeProgressFx = ProgressDomain.effect<
	SubscribeChangeProgressProps & WithCloseRef,
	void
>('subscribeChangeProgressFx');

export const loadTasksProgress = ProgressDomain.event<ID>('loadTasksProgress');
export const subscribeChangeProgress = ProgressDomain.event<
	{
		roomId: ID;
	} & WithCloseRef
>('subscribeChangeProgressEvent');
export const changeProgress = ProgressDomain.event<ChangeProgressResponse[]>(
	'changeProgressEvent'
);
export const resetProgress = ProgressDomain.event('resetProgress');
