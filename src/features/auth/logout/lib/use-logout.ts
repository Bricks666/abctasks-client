import { useMolecule } from 'bunshi/react';

import { logoutModel } from '../model';

export const useLogout = () => {
	return useMolecule(logoutModel.Molecule);
};
