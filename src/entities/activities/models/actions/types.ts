import { Atom } from '@reatom/framework';
import zod from 'zod';

export const activityActionSchema = zod
	.object({
		id: zod.number(),
		name: zod.string(),
	})
	.readonly();

export interface ActivityAction
	extends zod.infer<typeof activityActionSchema> {}
export type ActivityActionId = ActivityAction['id'];
export type ActivityActions = ActivityAction[];

export interface ActivityActionsModel {
	readonly actionsAtom: Atom<ActivityActions>;
	readonly pendingAtom: Atom<boolean>;
}
