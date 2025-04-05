import { useMolecule } from 'bunshi/react';

import { activateUserModel } from '../model';

export const useActivateUser = () => {
	return useMolecule(activateUserModel.Molecule);
};
