import { Query, AddType } from '@/types';
import { Location } from '@/models/routing';
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

	let newQuery = prepareQuery(query, keepOldQuery ? location.query : {});
	newQuery = prepareQuery(query, {}, deleteQuery);
	const to = path ?? location.path;

	return `${to}?${newQuery}`;
};
