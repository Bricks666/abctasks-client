import { useCallback, useEffect } from "react";

export const useClickOutside = (
	reference: HTMLElement | null,
	onClick: (evt?: MouseEvent) => unknown,
	...conditions: boolean[]
): void => {
	const listener = useCallback(
		(evt: globalThis.MouseEvent) => {
			const target = evt.target as HTMLElement;
			const isClickOutside =
				target !== reference &&
				!reference?.innerHTML.includes(target.innerHTML) &&
				conditions.every((condition) => condition);

			if (isClickOutside) {
				onClick(evt);
			}
		},
		[onClick, reference, conditions]
	);

	useEffect(() => {
		document.addEventListener("click", listener);

		return () => document.removeEventListener("click", listener);
	}, [listener]);
};
