import { useMolecule } from 'bunshi/react';

import { MembersModel, membersModel } from '../models';

export const useMembers = (): MembersModel => {
	return useMolecule(membersModel.Molecule);
};
