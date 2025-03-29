import { reaction, select } from '@reatom/framework';
import { createScope, molecule, use } from 'bunshi';

import { FormFieldOptions, reatomForm } from '@reatom/form';
// import { withSearchParamsPersist } from '@reatom/url';

import { constructName } from '@/shared/lib';

import type {
	ActivitiesFiltersModel,
	ActivitiesFitlers,
	OnFiltersChanged
} from './types';

const modelName = 'activities-filters';

export const Scope = createScope<unknown>(null);

export const Molecule = molecule((): ActivitiesFiltersModel => {
	use(Scope);

	const form = reatomForm(
		{
			actionIds: { initState: [] as ActivitiesFitlers['actionIds'], },
			activistIds: {
				initState: [],
			} as FormFieldOptions<ActivitiesFitlers['activistIds']>,
			after: null as ActivitiesFitlers['after'],
			before: null as ActivitiesFitlers['before'],
			sphereIds: { initState: [] as ActivitiesFitlers['sphereIds'], },
		},
		{
			resetOnSubmit: false,
			name: constructName(modelName, 'form'),
		}
	);

	const onFiltersChanged = reaction(
		(ctx, onChange: OnFiltersChanged) => {
			// Take some state
			const filters = select(ctx, (ctx) => {
				ctx.spy(form.submit.onFulfill);
				ctx.spy(form.reset);

				return ctx.get(form.fieldsState);
			});

			// @todo Remove type assertion when parseAtoms types will be fixed
			return onChange(filters as unknown as ActivitiesFitlers);
		},
		constructName(modelName, 'onFiltersChanged')
	);

	/**
	 * @todo It does not work
	 */
	// form.fieldsState.pipe(
	// 	withSearchParamsPersist('filters', {
	// 		replace: true,
	// 		parse: (v = '') =>
	// 			qs.parse(v, { parseArrays: true }) as any as ActivitiesFitlers,
	// 		serialize: (v: ActivitiesFitlers) =>
	// 			queryString.stringify(v, { arrayFormat: 'brackets' }),
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
		onFiltersChanged,
	};
});
