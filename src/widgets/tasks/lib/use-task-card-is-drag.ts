import { useStoreMap } from 'effector-react';
import { dragTaskModel } from '../model';

export const useTaskCardIsDrag = (id: number): boolean => {
	return useStoreMap({
		store: dragTaskModel.$id,
		keys: [id],
		defaultValue: false,
		fn: (draggingId, [id]) => {
			return draggingId === id;
		},
	});
};
