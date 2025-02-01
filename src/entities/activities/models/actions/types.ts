import { Atom } from '@reatom/framework';
import zod from 'zod';

import { createStandardResponseSchema } from '@/shared/lib';

export const activityActionSchema = zod
	.object({
		id: zod.number(),
		name: zod.string(),
	})
	.readonly();
export const activityActionsSchema = zod.array(activityActionSchema);

export const activityActionsResponseSchema = createStandardResponseSchema(
	activityActionsSchema
);

export interface ActivityAction
	extends zod.infer<typeof activityActionSchema> {}
export type ActivityActionId = ActivityAction['id'];
export type ActivityActions = ActivityAction[];

export interface ActivityActionsModel {
	readonly actionsAtom: Atom<ActivityActions>;
	readonly pendingAtom: Atom<boolean>;
}
