import { useStore } from 'effector-react';
import { loadUserFx } from '@/models/User';

export const useProfileLoading = () => {
	return useStore(loadUserFx.pending);
};
