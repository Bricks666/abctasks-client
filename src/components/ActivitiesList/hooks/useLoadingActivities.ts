import { useStore } from 'effector-react';
import { loadActivitiesFx } from '@/models/Activities';

export const useLoadingActivities = () => {
	return useStore(loadActivitiesFx.pending);
};
