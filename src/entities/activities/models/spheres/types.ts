import { Atom } from '@reatom/framework';
import { Number, Record, Static, String } from 'runtypes';

export const activitySphereRT = Record({
	id: Number,
	name: String,
}).asReadonly();

export interface ActivitySphere extends Static<typeof activitySphereRT> {}
export type ActivitySpheres = ActivitySphere[];

export interface ActivitySpheresModel {
	readonly spheresAtom: Atom<ActivitySpheres>;
	readonly pendingAtom: Atom<boolean>;
}
