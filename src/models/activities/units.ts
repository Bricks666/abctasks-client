/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { StandardResponse } from '@/types/response';
import { Activity } from './types';

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
