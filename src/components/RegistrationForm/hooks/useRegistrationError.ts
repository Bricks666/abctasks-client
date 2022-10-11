import { useStore } from 'effector-react';
import { $RegistrationError } from '@/models/auth';

export const useRegistrationError = () => {
	return useStore($RegistrationError);
};
