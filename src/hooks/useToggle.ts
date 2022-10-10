import { useCallback, useState } from 'react';
import { VoidFunction } from '@/interfaces/common';

export const useToggle = (defaultValue = false): [boolean, VoidFunction] => {
	const [isToggle, setIsToggle] = useState(defaultValue);

	const toggle = useCallback(() => {
		setIsToggle(!isToggle);
	}, [isToggle]);

	return [isToggle, toggle];
};
