import { createDomain } from 'effector';
import { createForm } from 'effector-forms';
import { GetActivitiesInRoomParams } from '@/shared/api';

const activitiesFiltersDomain = createDomain();

export interface ActivitiesFiltersForm
	extends Required<
		Omit<GetActivitiesInRoomParams, 'roomId' | 'count' | 'page' | 'by' | 'type'>
	> {}

export const form = createForm<ActivitiesFiltersForm>({
	fields: {
		activistIds: {
			init: [],
		},
		after: {
			init: null,
		},
		before: {
			init: null,
		},
		sphereIds: { init: [], },
		actionIds: { init: [], },
	},
	domain: activitiesFiltersDomain,
});
