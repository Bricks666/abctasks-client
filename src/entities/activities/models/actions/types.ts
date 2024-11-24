import { Atom } from '@reatom/framework';
import { Number, Record, Static, String } from 'runtypes';

export const activityActionRT = Record({
	id: Number,
	name: String,
}).asReadonly();

export interface ActivityAction extends Static<typeof activityActionRT> {}
export type ActivityActionId = ActivityAction['id'];
export type ActivityActions = ActivityAction[];

export interface ActivityActionsModel {
	readonly actionsAtom: Atom<ActivityActions>;
	readonly pendingAtom: Atom<boolean>;
}
