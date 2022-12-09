import { RouteQuery } from 'atomic-router';

export interface Location {
	readonly path: string;
	readonly query: RouteQuery;
}
