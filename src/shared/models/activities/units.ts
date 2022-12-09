/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { Activity } from './types';
import { StandardResponse, InRoomRequest } from '@/types';

export const ActivitiesDomain = createDomain('ActivitiesDomain');

export const $Activities = ActivitiesDomain.store<Activity[]>([], {
	name: 'ActivitiesStore',
});

export const getActivitiesFx = ActivitiesDomain.effect<
	number,
	StandardResponse<Activity[]>
>('getActivitiesFx');

export const getActivities =
	ActivitiesDomain.event<number>('getActivitiesEvent');

export const ActivityGate = createGate<InRoomRequest>({
	domain: ActivitiesDomain,
	name: 'activitiesGate',
});
