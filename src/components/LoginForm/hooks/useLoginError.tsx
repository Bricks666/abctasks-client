import { useStore } from 'effector-react';
import { $LoginError } from '@/models/Auth';

export const useLoginError = () => {
	return useStore($LoginError);
};
