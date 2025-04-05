import { useMolecule } from 'bunshi/react';

import { activititesModel } from '../models';

export const useActivities = () => {
	return useMolecule(activititesModel.Molecule);
};
