import { atom } from '@reatom/framework';
import { withSearchParamsPersist } from '@reatom/url';

import { PAGE_SEARCH_PARAM_NAME } from '@/shared/configs';
import { constructName } from '@/shared/lib';

import {
	ActivitiesPaginationModel,
	CreateActivitiesPaginationModelParams
} from './types';

const modelName = 'pagination';

export const create = (
	params: CreateActivitiesPaginationModelParams
): ActivitiesPaginationModel => {
	const { name, onPageChanged, } = params;

	const pageAtom = atom<number>(
		1,
		constructName(name, modelName, 'pageAtom')
	).pipe(
		withSearchParamsPersist(PAGE_SEARCH_PARAM_NAME, (page = '1') =>
			Number(page)
		)
	);

	pageAtom.onChange((_ctx, page) => onPageChanged({ page, }));
	pageAtom.onChange((ctx) => {
		ctx.schedule(() => {
			window.scrollTo({
				left: 0,
				top: 0,
			});
		});
	});

	return { pageAtom, };
};
