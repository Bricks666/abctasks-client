import { useMolecule } from 'bunshi/react';

import { tasksModel } from '../models';

export const useTasks = () => {
	return useMolecule(tasksModel.Molecule);
};
