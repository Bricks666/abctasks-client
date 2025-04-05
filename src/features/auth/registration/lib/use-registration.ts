import { useMolecule } from 'bunshi/react';

import { registrationModel } from '../model';

export const useRegistration = () => {
	return useMolecule(registrationModel.Molecule);
};
