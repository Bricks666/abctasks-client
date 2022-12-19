import { useQuery } from '@farfetched/react';
import { useGate, useUnit } from 'effector-react';
import { progressesModel } from '../model';

export const useProgresses = (roomId: number) => {
	useGate(progressesModel.Gate, { roomId, });
	const query = useQuery(progressesModel.query);
	const status = useUnit(progressesModel.query.$status);
	return {
		...query,
		status,
	};
};
