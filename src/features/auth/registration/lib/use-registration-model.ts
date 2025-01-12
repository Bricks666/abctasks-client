import { useMemo } from 'react';

import { registrationModel } from '../model';

export const useRegistrationModel = () => {
	return useMemo(() => registrationModel.create(), []);
};
