import { Action, Atom } from '@reatom/framework';
import { Record, String, Static, Number } from 'runtypes';

import { StandardResponse } from '@/shared/types';

export const userRT = Record({
	id: Number,
	email: String,
	username: String,
	photo: String.nullable(),
}).asReadonly();

export interface User extends Static<typeof userRT> {}
export type Users = User[];

export type UserId = User['id'];

export interface CreateMembersModelParams {
	readonly roomId: number;
}

export interface MembersModel {
	readonly membersAtom: Atom<Users>;
	readonly pendingAtom: Atom<boolean>;
	readonly errorAtom: Atom<Error | null>;
	readonly retry: Action<[], Promise<StandardResponse<Users>>>;
}
