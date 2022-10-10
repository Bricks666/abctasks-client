import { useStore } from 'effector-react';
import { $Login } from '../models/Auth';

export const useIsLogin = () => {
	return useStore($Login);
};
