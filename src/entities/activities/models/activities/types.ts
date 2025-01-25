import { AsyncAction, Atom } from '@reatom/framework';
import { Number, Record, Static, String } from 'runtypes';

import { user } from '@/shared/api';
import {
	PaginationResponse,
	SortDirection,
	StandardResponse
} from '@/shared/types';

import { ActivityActionId, activityActionRT } from '../actions';
import { ActivitySphereId, activitySphereRT } from '../spheres';

export const activityRT = Record({
	id: Number,
	roomId: Number,
	activist: user,
	action: activityActionRT,
	sphere: activitySphereRT,
	createdAt: String,
}).asReadonly();

export interface Activity extends Static<typeof activityRT> {}
export type ActivityId = Activity['id'];

export type Activities = Activity[];

export interface FetchActivititesParams {
	readonly page?: number;
	readonly by?: string | null;
	readonly type?: SortDirection | null;
	readonly before?: string | null;
	readonly after?: string | null;
	/**
	 * @todo Extract into new type
	 */
	readonly activistIds?: number[];
	readonly sphereIds?: ActivitySphereId[];
	readonly actionIds?: ActivityActionId[];
}

export interface CreateActivitiesModelParams {
	readonly name: string;
	readonly roomId: number;

	/**
	 * @default 50
	 */
	readonly count?: number;
}

export interface ActivitiesModel {
	readonly fetch: AsyncAction<
		[params?: FetchActivititesParams],
		StandardResponse<PaginationResponse<Activity>>
	>;
	readonly activititesAtom: Atom<Activities>;
	readonly errorAtom: Atom<Error | null>;
	readonly pagesCountAtom: Atom<number>;
	readonly hasItemsAtom: Atom<boolean>;
	readonly pendingAtom: Atom<boolean>;
}
