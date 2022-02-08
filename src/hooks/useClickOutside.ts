import { useEffect } from "react";

export const useClickOutside = (
	reference: HTMLElement | null,
	onClick: (evt?: MouseEvent) => unknown,
	...conditions: boolean[]
): void => {
	useEffect(() => {
		const listener = (evt: globalThis.MouseEvent) => {
			const target = evt.target as HTMLElement;
			const isClickOutside =
				target !== reference &&
				!reference?.contains(target) &&
				conditions.every((condition) => condition);

			if (isClickOutside) {
				onClick(evt);
			}
		};
		document.addEventListener("mousedown", listener);

		return () => document.removeEventListener("mousedown", listener);
	}, [reference, onClick, conditions]);
};
