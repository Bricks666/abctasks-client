import type { Action, Reaction } from '@reatom/framework';

import type { FieldAtom } from '@reatom/form';

import type { ActivityActionId, ActivitySphereId } from '@/entities/activities';
import type { UserId } from '@/entities/users';

export interface ActivitiesFitlers {
	readonly actionIds: ActivityActionId[];
	readonly activistIds: UserId[];
	readonly after: string | null;
	readonly before: string | null;
	readonly sphereIds: ActivitySphereId[];
}

export type OnFiltersChanged = (filters: ActivitiesFitlers) => void;

export interface ActivitiesFiltersModel {
	readonly submit: Action;
	readonly reset: Action;
	readonly actionIds: FieldAtom<ActivityActionId[]>;
	readonly activistIds: FieldAtom<UserId[]>;
	readonly after: FieldAtom<string | null>;
	readonly before: FieldAtom<string | null>;
	readonly sphereIds: FieldAtom<ActivitySphereId[]>;
	readonly onFiltersChanged: Reaction<[onChange: OnFiltersChanged], void>;
}
