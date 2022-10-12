/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { SubscribeNewActivitiesApiParams } from '@/api/activities';
import { ID, WithCloseRef } from '@/types/common';
import { ActivitiesResponse, ActivityResponse } from '@/types/response';
import { ActivityStructure } from './types';

export const ActivitiesDomain = createDomain('ActivitiesDomain');

export const $Activities = ActivitiesDomain.store<ActivityStructure[]>([], {
	name: 'ActivitiesStore',
});

export const loadActivitiesFx = ActivitiesDomain.effect<ID, ActivitiesResponse>(
	'loadActivitiesFx'
);
export const subscribeNewActivityFx = ActivitiesDomain.effect<
	SubscribeNewActivitiesApiParams & WithCloseRef,
	void
>('subscribeNewActivityFx');

export const loadActivities = ActivitiesDomain.event<ID>('loadActivitiesEvent');
export const subscribeNewActivity = ActivitiesDomain.event<
	{ roomId: ID } & WithCloseRef
>('subscribeNewActivityEvent');
export const addActivity =
	ActivitiesDomain.event<ActivityResponse>('addActivityEvent');
