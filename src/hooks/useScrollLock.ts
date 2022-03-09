import { useEffect } from "react";

export const useScrollLock = (
	lockOn: null | HTMLElement,
	condition: boolean,
	marginRight = "0px"
) => {
	useEffect(() => {
		if (lockOn) {
			lockOn.style.overflow = condition ? "hidden" : "";
			lockOn.style.marginRight = condition ? marginRight : "";
		}
	}, [lockOn, condition, marginRight]);
};
