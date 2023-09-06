import { useGate, useUnit } from 'effector-react';

import { authModel } from '../model';

export const useAuth = () => {
	useGate(authModel.Gate);
	const query = useUnit(authModel.query);
	const status = useUnit(authModel.query.$status);
	return { status, ...query, };
};
