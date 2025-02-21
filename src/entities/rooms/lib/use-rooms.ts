import { useMolecule } from 'bunshi/react';

import { roomsModel } from '../models';

export const useRooms = () => {
	return useMolecule(roomsModel.Molecule);
};
