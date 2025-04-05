import type { Action, Reaction } from '@reatom/framework';

import type { FieldAtom, FormInitState } from '@reatom/form';

import type { TagId } from '@/entities/tags';
import type { UserId } from '@/entities/users';

export interface TasksFilters extends FormInitState {
	readonly tagIds: TagId[];
	readonly authorIds: UserId[];
	readonly after: string | null;
	readonly before: string | null;
}

export type OnFiltersChanged = (filters: TasksFilters) => void;

export interface TasksFiltersModel {
	readonly submit: Action;
	readonly reset: Action;
	readonly tagIds: FieldAtom<TagId[]>;
	readonly authorIds: FieldAtom<UserId[]>;
	readonly after: FieldAtom<string | null>;
	readonly before: FieldAtom<string | null>;
	readonly onFiltersChanged: Reaction<[onChange: OnFiltersChanged], void>;
}
