import { useGate, useUnit } from 'effector-react';

import { tagModel } from '../model';

export const useTag = (tagId: number, roomId: number) => {
	useGate(tagModel.Gate, { id: tagId, roomId, });
	return useUnit(tagModel.query);
};
