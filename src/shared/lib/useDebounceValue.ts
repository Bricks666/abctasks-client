import { useLayoutEffect, useState } from 'react';

export const useDebounceValue = <T>(value: T, timeout: number): T => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useLayoutEffect(() => {
		const id = window.setTimeout(() => {
			setDebouncedValue(value);
		}, timeout);

		return () => {
			clearInterval(id);
		};
	}, [value, timeout]);

	return debouncedValue;
};
