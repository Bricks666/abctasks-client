import { useMolecule } from 'bunshi/react';

import { activityActionsModel } from '../models';

export const useActivityActions = () => {
	return useMolecule(activityActionsModel.Molecule);
};
