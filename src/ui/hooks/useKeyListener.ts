import { useEffect } from "react";

export const useKeyListener = (
	key: string,
	callback: VoidFunction,
	condition: boolean
) => {
	useEffect(() => {
		if (condition) {
			document.onkeydown = (evt) => {
				if (evt.key === key) {
					callback();
				}
			};
		}

		return () => {
			document.onkeydown = null;
		};
	}, [key, callback, condition]);
};
