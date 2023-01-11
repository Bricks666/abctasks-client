import { createDomain } from 'effector';
import { createForm } from 'effector-forms';
import { GetActivitiesInRoomParams, User } from '@/shared/api';

const activitiesFiltersDomain = createDomain();

interface ActivitiesFiltersForm
	extends Required<
		Omit<GetActivitiesInRoomParams, 'roomId' | 'activistId' | 'count' | 'page'>
	> {
	readonly activist: User | null;
}

export const form = createForm<ActivitiesFiltersForm>({
	fields: {
		activist: {
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
	validateOn: ['submit'],
	domain: activitiesFiltersDomain,
});
