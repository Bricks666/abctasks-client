import { useQuery } from '@farfetched/react';
import { useGate, useUnit } from 'effector-react';
import { authModel } from '../model';

export const useAuth = () => {
	useGate(authModel.AuthGate);
	const query = useQuery(authModel.authQuery);
	const status = useUnit(authModel.authQuery.$status);
	return { status, ...query, };
};
