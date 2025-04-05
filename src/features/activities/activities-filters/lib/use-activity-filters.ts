import { useMolecule } from 'bunshi/react';

import { useReaction } from '@/shared/lib';

import { activitiesFiltersModel, type OnFiltersChanged } from '../model';

export interface UseActivityFiltersParams {
	readonly onFiltersChanged?: OnFiltersChanged;
}

export const useActivityFilters = (params: UseActivityFiltersParams = {}) => {
	const { onFiltersChanged, } = params;

	const model = useMolecule(activitiesFiltersModel.Molecule);

	useReaction(model.onFiltersChanged, onFiltersChanged);

	return model;
};
