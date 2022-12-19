import { useQuery } from '@farfetched/react';
import { useGate, useUnit } from 'effector-react';
import { progressesModel } from '../model';

export const useProgresses = (roomId: number) => {
	useGate(progressesModel.ProgressGate, { roomId, });
	const query = useQuery(progressesModel.getProgressQuery);
	const status = useUnit(progressesModel.getProgressQuery.$status);
	return {
		...query,
		status,
	};
};
