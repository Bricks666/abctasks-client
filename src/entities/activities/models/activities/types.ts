import { Action, Atom } from '@reatom/framework';
import zod from 'zod';

import { userSchema } from '@/entities/users/@x/activities';

import { createPaginationResponseSchema } from '@/shared/lib';
import { SortDirection } from '@/shared/types';

import { ActivityActionId, activityActionSchema } from '../actions';
import { ActivitySphereId, activitySphereSchema } from '../spheres';

export const activitySchema = zod
	.object({
		id: zod.number(),
		roomId: zod.number(),
		activist: userSchema,
		action: activityActionSchema,
		sphere: activitySphereSchema,
		createdAt: zod.string(),
	})
	.readonly();
export const acitivitiesResponseSchema =
	createPaginationResponseSchema(activitySchema);

export interface Activity extends zod.infer<typeof activitySchema> {}
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

type ChangeFetchActivitiesParams = Action<
	[params: FetchActivititesParams],
	FetchActivititesParams
>;

export interface CreateActivitiesModelParams {
	readonly name: string;
	readonly roomId: number;

	/**
	 * @default 50
	 */
	readonly count?: number;
}

export interface ActivitiesModel {
	readonly activititesAtom: Atom<Activities>;
	readonly errorAtom: Atom<Error | null>;
	readonly pagesCountAtom: Atom<number>;
	readonly hasItemsAtom: Atom<boolean>;
	readonly pendingAtom: Atom<boolean>;
	readonly refetch: Action;
	readonly changeFetchActivitiesParams: ChangeFetchActivitiesParams;
}
