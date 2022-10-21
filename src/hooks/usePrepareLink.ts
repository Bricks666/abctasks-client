import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ID } from '@/types/common';

export interface UsePrepareLinkParams {
	readonly query?: Record<string, string>;
	readonly saveQuery?: boolean;
	readonly addQuery?: Record<string, ID>;
	readonly to?: string;
}

export const usePrepareLink = ({
	to,
	addQuery,
	query,
	saveQuery = false,
}: UsePrepareLinkParams): string => {
	const location = useLocation();
	return useMemo(() => {
		const pathname = to || location.pathname;

		const newQuery = saveQuery
			? new URLSearchParams(location.search)
			: new URLSearchParams();

		Object.entries(query || {}).forEach(([key, value]) =>
			newQuery.set(key, value)
		);
		Object.entries(addQuery || {}).forEach(([key, value]) => {
			const query = newQuery.get(key);
			const currentValues = query?.split(',') || null;
			const newValue = currentValues
				? `${currentValues.join(',')},${value}`
				: value;
			newQuery.set(key, newValue as string);
		});

		return `${pathname}?${newQuery.toString()}`;
	}, [location, to, addQuery, query, saveQuery]);
};
