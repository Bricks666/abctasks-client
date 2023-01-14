import { createDomain } from 'effector';
import { createForm } from 'effector-forms';
import { GetActivitiesInRoomParams } from '@/shared/api';

const activitiesFiltersDomain = createDomain();

interface ActivitiesFiltersForm
	extends Required<
		Omit<GetActivitiesInRoomParams, 'roomId' | 'count' | 'page'>
	> {}

export const form = createForm<ActivitiesFiltersForm>({
	fields: {
		activistId: {
			init: null,
		},
		after: {
			init: null,
		},
		before: {
			init: null,
		},
		sphereName: { init: null, },
		action: { init: null, },
	},
	domain: activitiesFiltersDomain,
});
