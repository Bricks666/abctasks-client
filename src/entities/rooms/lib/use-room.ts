import { useMolecule } from 'bunshi/react';

import { roomModel } from '../models';

/**
 * Use room provided in current scope where the component is mounted
 */
export const useRoom = () => {
	return useMolecule(roomModel.RoomMolecule);
};
