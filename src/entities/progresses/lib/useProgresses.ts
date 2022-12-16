import { useQuery } from '@farfetched/react';
import { useGate } from 'effector-react';
import { progressesModel } from '../model';

export const useProgresses = (roomId: number) => {
	useGate(progressesModel.ProgressGate, { roomId, });
	return useQuery(progressesModel.getProgressQuery);
};
