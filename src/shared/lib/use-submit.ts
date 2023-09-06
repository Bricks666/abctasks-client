import { FormEvent, useCallback } from 'react';

import { VoidFunction } from '../types';

export const useSubmit = (submit: VoidFunction) => {
	return useCallback((evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		submit();
	}, []);
};
