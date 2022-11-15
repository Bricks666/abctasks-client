import * as React from 'react';
import { VoidFunction } from '@/types';

export const useToggle = (defaultValue = false): [boolean, VoidFunction] => {
	const [isToggle, setIsToggle] = React.useState(defaultValue);

	const toggle = React.useCallback(() => {
		setIsToggle(!isToggle);
	}, [isToggle]);

	return [isToggle, toggle];
};
