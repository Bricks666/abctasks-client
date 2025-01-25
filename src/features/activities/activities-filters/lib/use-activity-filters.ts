import { useMemo } from 'react';

import {
	ActivitiesFiltersModel,
	OnFiltersChanged,
	activitiesFiltersModel
} from '../model';

export interface UseActivityFiltersParams {
	readonly name: string;
	readonly onFiltersChanged: OnFiltersChanged;
}

export const useActivityFilters = (
	params: UseActivityFiltersParams
): ActivitiesFiltersModel => {
	const { name, onFiltersChanged, } = params;

	return useMemo(() => {
		return activitiesFiltersModel.create({ name, onFiltersChanged, });
	}, [name, onFiltersChanged]);
};
