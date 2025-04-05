import { useMolecule } from 'bunshi/react';

import { tagsModel } from '../models';

export const useTags = () => {
	return useMolecule(tagsModel.Molecule);
};
