import { useMemo } from 'react';

import { loginModel } from '../model';

export const useLoginModel = () => {
	return useMemo(loginModel.create, []);
};
