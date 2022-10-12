import { useEffect } from 'react';
import { VoidFunction } from '@/types/common';

export const useKeyListener = (
	key: string,
	callback: VoidFunction,
	condition: boolean
) => {
	useEffect(() => {
		let onKeyDown: (evt: globalThis.KeyboardEvent) => unknown;
		if (condition) {
			onKeyDown = (evt: globalThis.KeyboardEvent) => {
				if (evt.key === key) {
					callback();
				}
			};
			document.addEventListener('keydown', onKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [key, callback, condition]);
};
