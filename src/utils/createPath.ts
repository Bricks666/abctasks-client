import { Location } from "react-router-dom";

export const createPath = (location: Location) => {
	const pathname = location.pathname;
	const search = location.search;
	const hash = location.hash;

	return pathname + search + hash;
};
