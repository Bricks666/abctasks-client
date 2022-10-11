import { useStore } from 'effector-react';
import { $LoginError } from '@/models/auth';

export const useLoginError = () => {
	return useStore($LoginError);
};
