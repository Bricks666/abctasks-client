import { isInit, reaction } from '@reatom/framework';
import { createScope, molecule, use } from 'bunshi';

import { reatomForm } from '@reatom/form';

import { constructName } from '@/shared/lib';

import type {
	OnFiltersChanged,
	TasksFilters,
	TasksFiltersModel
} from './types';

const modelName = 'tasks-filters';

export const FiltersScope = createScope(undefined);

export const Molecule = molecule((): TasksFiltersModel => {
	use(FiltersScope);

	const form = reatomForm<TasksFilters>(
		{
			tagIds: {
				initState: [] as TasksFilters['tagIds'],
			},
			authorIds: {
				initState: [] as TasksFilters['authorIds'],
			},
			after: {
				initState: null as TasksFilters['after'],
			},
			before: {
				initState: null as TasksFilters['before'],
			},
		},
		{
			name: constructName(modelName, 'form'),
			resetOnSubmit: false,
		}
	);

	const onFiltersChanged = reaction(
		(ctx, onChange: OnFiltersChanged) => {
			ctx.spy(form.submit.onFulfill);
			ctx.spy(form.reset);

			if (isInit(ctx)) {
				return;
			}

			// @todo Remove type assertion when parseAtoms types will be fixed
			return onChange(ctx.get(form.fieldsState) as unknown as TasksFilters);
		},
		constructName(modelName, 'onFiltersChanged')
	);

	// @todo Move to tasks filters model
	// querySync({
	// 	controls,
	// 	source: {
	// 		[SEARCH_PARAMS_NAMES.userId]: fields.authorIds.$value,
	// 		[SEARCH_PARAMS_NAMES.tagId]: fields.tagIds.$value,
	// 		[SEARCH_PARAMS_NAMES.after]: fields.after.$value,
	// 		[SEARCH_PARAMS_NAMES.before]: fields.before.$value,
	// 	},
	// 	clock: [formValidated, reset],
	// 	route: authorizedRoute,
	// });

	const { submit, reset, fields, } = form;
	const { tagIds, authorIds, after, before, } = fields;

	return {
		submit,
		reset,
		tagIds,
		authorIds,
		after,
		before,
		onFiltersChanged,
	};
});
