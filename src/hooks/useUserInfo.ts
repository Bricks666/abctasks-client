import { useStore } from 'effector-react';
import { $User } from '@/models/User';

export const useUserInfo = () => {
	return useStore($User);
};
