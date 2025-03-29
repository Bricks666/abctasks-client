import { useCtx } from '@reatom/npm-react';
import { useMolecule } from 'bunshi/react';
import { useEffect } from 'react';

import { activitiesFiltersModel, type OnFiltersChanged } from '../model';

export interface UseActivityFiltersParams {
	readonly onFiltersChanged?: OnFiltersChanged;
}

export const useActivityFilters = (params: UseActivityFiltersParams = {}) => {
	const { onFiltersChanged, } = params;

	const ctx = useCtx();
	const model = useMolecule(activitiesFiltersModel.Molecule);

	useEffect(() => {
		if (onFiltersChanged) {
			const reactionAtom = model.onFiltersChanged(ctx, onFiltersChanged);

			return () => reactionAtom.unsubscribe();
		}
	}, [model, ctx, onFiltersChanged]);

	return model;
};
