import { SyntheticEvent, useCallback } from 'react';

import { VoidFunction } from '../types';

export const usePreventDefault = <
	Element extends HTMLElement,
	Event extends SyntheticEvent<Element>
>(
		fn: VoidFunction
	) => {
	return useCallback((evt: Event) => {
		evt.preventDefault();
		fn();
	}, []);
};
