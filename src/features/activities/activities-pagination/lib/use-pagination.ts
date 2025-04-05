import { useMolecule } from 'bunshi/react';

import { useReaction } from '@/shared/lib';

import { OnPageChanged, activitiesPaginationModel } from '../model';

export interface UsePaginationParams {
	readonly onPageChanged?: OnPageChanged;
}

export const usePagination = (params: UsePaginationParams) => {
	const { onPageChanged, } = params;

	const model = useMolecule(activitiesPaginationModel.Molecule);

	useReaction(model.onPageChanged, onPageChanged);

	return model;
};
