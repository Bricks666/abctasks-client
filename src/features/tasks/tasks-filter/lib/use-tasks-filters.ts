import { useMolecule } from 'bunshi/react';

import { useReaction } from '@/shared/lib';

import { tasksFiltersModel } from '../model';
import { OnFiltersChanged } from '../model/types';

export interface UseTasksFiltersParams {
	readonly onFiltersChanged?: OnFiltersChanged;
}

export const useTasksFilters = (params: UseTasksFiltersParams = {}) => {
	const { onFiltersChanged, } = params;

	const model = useMolecule(tasksFiltersModel.Molecule);

	useReaction(model.onFiltersChanged, onFiltersChanged);

	return model;
};
