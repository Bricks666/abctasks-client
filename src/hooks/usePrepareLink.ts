import { useLocation } from "react-router-dom";

interface UsePrepareLinkParams {
	readonly query?: Record<string, string>;
	readonly saveQuery?: boolean;
	readonly addQuery?: Record<string, string>;
	readonly to?: string;
}

export interface UsePrepareLinkResponse {
	readonly pathname: string;
	readonly search: string;
	readonly hash: string;
}

export const usePrepareLink = ({
	to,
	addQuery = {},
	query = {},
	saveQuery = false,
}: UsePrepareLinkParams): UsePrepareLinkResponse => {
	const location = useLocation();
	const pathname = to || location.pathname;

	const newQuery = saveQuery
		? new URLSearchParams(location.search)
		: new URLSearchParams();

	Object.entries(query).forEach(([key, value]) => newQuery.set(key, value));
	Object.entries(addQuery).forEach(([key, value]) => {
		const query = newQuery.get(key);
		const currentValues = query?.split(",") || null;
		const newValue = currentValues
			? `${currentValues.join(",")},${value}`
			: value;
		newQuery.set(key, newValue);
	});

	return {
		pathname,
		search: newQuery.toString() || "",
		hash: location.hash,
	};
};
