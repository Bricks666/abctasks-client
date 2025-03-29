import { useMolecule } from 'bunshi/react';

import { tagModel } from '../models';

export const useTag = () => {
	return useMolecule(tagModel.Molecule);
};
