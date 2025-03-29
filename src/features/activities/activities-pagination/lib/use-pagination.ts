import { useCtx } from '@reatom/npm-react';
import { useMolecule } from 'bunshi/react';
import { useEffect } from 'react';

import { OnPageChanged, activitiesPaginationModel } from '../model';

export interface UsePaginationParams {
	readonly onPageChanged?: OnPageChanged;
}

export const usePagination = (params: UsePaginationParams) => {
	const { onPageChanged, } = params;

	const ctx = useCtx();
	const model = useMolecule(activitiesPaginationModel.Molecule);

	useEffect(() => {
		if (onPageChanged) {
			const reaction = model.onPageChanged(ctx, onPageChanged);

			return () => reaction.unsubscribe();
		}
	}, [model, ctx, onPageChanged]);

	return model;
};
