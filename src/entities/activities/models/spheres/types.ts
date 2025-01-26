import { Atom } from '@reatom/framework';
import zod from 'zod';

export const activitySphereSchema = zod
	.object({
		id: zod.number(),
		name: zod.string(),
	})
	.readonly();

export interface ActivitySphere
	extends zod.infer<typeof activitySphereSchema> {}
export type ActivitySphereId = ActivitySphere['id'];

export type ActivitySpheres = ActivitySphere[];

export interface ActivitySpheresModel {
	readonly spheresAtom: Atom<ActivitySpheres>;
	readonly pendingAtom: Atom<boolean>;
}
