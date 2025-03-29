import { atom, reaction } from '@reatom/framework';
import { withSearchParamsPersist } from '@reatom/url';
import { createScope, molecule, use } from 'bunshi';

import { PAGE_SEARCH_PARAM_NAME } from '@/shared/configs';
import { constructName } from '@/shared/lib';

import type { ActivitiesPaginationModel, OnPageChanged } from './types';

const modelName = 'pagination';

export const Scope = createScope<unknown>(undefined);

export const Molecule = molecule((): ActivitiesPaginationModel => {
	use(Scope);

	const pageAtom = atom<number>(1, constructName(modelName, 'pageAtom')).pipe(
		withSearchParamsPersist(PAGE_SEARCH_PARAM_NAME, (page = '1') =>
			Number(page)
		)
	);

	const onPageChanged = reaction((ctx, onChange: OnPageChanged) => {
		const page = ctx.spy(pageAtom);

		onChange({ page, });
	});

	// @todo Move out
	pageAtom.onChange((ctx) => {
		ctx.schedule(() => {
			window.scrollTo({
				left: 0,
				top: 0,
			});
		});
	});

	return { pageAtom, onPageChanged, };
});
