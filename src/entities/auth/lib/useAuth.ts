import { useQuery } from '@farfetched/react';
import { useGate, useUnit } from 'effector-react';
import { authModel } from '../model';

export const useAuth = () => {
	useGate(authModel.Gate);
	const query = useQuery(authModel.query);
	const status = useUnit(authModel.query.$status);
	return { status, ...query, };
};
