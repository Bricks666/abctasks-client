import { useQuery } from '@farfetched/react';
import { useUnit } from 'effector-react';
import { progressesModel } from '../model';

export const useProgresses = () => {
	const query = useQuery(progressesModel.query);
	const status = useUnit(progressesModel.query.$status);
	return {
		...query,
		status,
	};
};
