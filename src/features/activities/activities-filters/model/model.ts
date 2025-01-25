// import qs from 'qs';
import { reatomForm } from '@reatom/form';
// import { withSearchParamsPersist } from '@reatom/url';

import { constructName } from '@/shared/lib';

import {
	ActivitiesFiltersModel,
	ActivitiesFitlers,
	CreateActivitiesFiltersModelParams
} from './types';

export const create = (
	params: CreateActivitiesFiltersModelParams
): ActivitiesFiltersModel => {
	const { name, onFiltersChanged, } = params;

	const form = reatomForm(
		{
			actionIds: {
				initState: [] satisfies ActivitiesFitlers['actionIds'],
			},
			activistIds: {
				initState: [] satisfies ActivitiesFitlers['activistIds'],
			},
			after: null as ActivitiesFitlers['after'],
			before: null as ActivitiesFitlers['before'],
			sphereIds: {
				initState: [] satisfies ActivitiesFitlers['sphereIds'],
			},
		},
		{
			onSubmit: (_ctx, state) => {
				onFiltersChanged(state);
			},
			resetOnSubmit: false,
			name: constructName(name, 'form'),
		}
	);

	form.reset.onCall((ctx) => {
		onFiltersChanged(ctx.get(form.fieldsState));
	});

	/**
	 * @todo It does not work
	 */
	// form.fieldsState.pipe(
	// 	withSearchParamsPersist('filters', {
	// 		replace: true,
	// 		parse: (v = '') =>
	// 			qs.parse(v, { parseArrays: true }) as any as ActivitiesFitlers,
	// 		serialize: (v: ActivitiesFitlers) =>
	// 			qs.stringify(v, { arrayFormat: 'brackets' }),
	// 	})
	// );

	const { submit, reset, } = form;
	const { actionIds, activistIds, after, before, sphereIds, } = form.fields;

	return {
		submit,
		reset,
		actionIds,
		activistIds,
		after,
		before,
		sphereIds,
	};
};
