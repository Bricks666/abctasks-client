import { useMolecule } from 'bunshi/react';

import { taskModel } from '../models';

export const useTask = () => {
	return useMolecule(taskModel.Molecule);
};
