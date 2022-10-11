import { useStore } from 'effector-react';
import { $Authorizing } from '../models/auth';

export const useIsAuthorizing = () => {
	return useStore($Authorizing);
};
