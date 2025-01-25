import { FieldAtom } from '@reatom/form';
import { Action } from '@reatom/framework';

import { Fn } from '@/shared/types';

export interface ActivitiesFitlers {
	readonly actionIds: number[];
	readonly activistIds: number[];
	readonly after: string | null;
	readonly before: string | null;
	readonly sphereIds: number[];
}

export type OnFiltersChanged = Fn<[filters: ActivitiesFitlers], void>;

export interface CreateActivitiesFiltersModelParams {
	readonly name: string;
	readonly onFiltersChanged: OnFiltersChanged;
}

export interface ActivitiesFiltersModel {
	readonly submit: Action;
	readonly reset: Action;
	readonly actionIds: FieldAtom<number[]>;
	readonly activistIds: FieldAtom<number[]>;
	readonly after: FieldAtom<string | null>;
	readonly before: FieldAtom<string | null>;
	readonly sphereIds: FieldAtom<number[]>;
}
