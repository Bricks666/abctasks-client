import { useMemo } from 'react';

import { OnPageChanged, activitiesPaginationModel } from '../model';

export interface UsePaginationParams {
	readonly name: string;
	readonly onPageChanged: OnPageChanged;
}

export const usePagination = (params: UsePaginationParams) => {
	const { name, onPageChanged, } = params;

	return useMemo(() => {
		return activitiesPaginationModel.create({ name, onPageChanged, });
	}, [name, onPageChanged]);
};
