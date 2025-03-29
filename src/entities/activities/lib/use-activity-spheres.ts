import { useMolecule } from 'bunshi/react';

import { activitySpheresModel } from '../models';

export const useActivitySpheres = () => {
	return useMolecule(activitySpheresModel.Molecule);
};
