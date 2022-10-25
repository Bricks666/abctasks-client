import { Location } from 'react-router-dom';
import { Query, AddType } from '@/types';
import { prepareQuery } from './prepareQuery';

export interface PrepareLinkParams {
	readonly path?: string;
	readonly query?: Query;
	readonly keepOldQuery?: boolean;
	readonly deleteQuery?: AddType<Query, boolean>;
}

export const prepareLink = (
	location: Location,
	params: PrepareLinkParams
): string => {
	const { path, query = {}, keepOldQuery = false, deleteQuery } = params;

	let newQuery = prepareQuery(query, keepOldQuery ? location.search : '');
	newQuery = prepareQuery(query, '', deleteQuery);
	const to = path ?? location.pathname;

	return `${to}?${newQuery}`;
};
