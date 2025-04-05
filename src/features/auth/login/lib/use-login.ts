import { useMolecule } from 'bunshi/react';

import { loginModel } from '../model';

export const useLogin = () => {
	return useMolecule(loginModel.Molecule);
};
