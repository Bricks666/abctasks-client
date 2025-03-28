import { Action, Atom } from '@reatom/framework';
import zod from 'zod';

export const userSchema = zod
	.object({
		id: zod.number(),
		email: zod.string().email(),
		username: zod.string(),
		photo: zod.string().url().nullable(),
	})
	.readonly();
export const userIdSchema = userSchema.unwrap().shape.id;

export interface User extends zod.infer<typeof userSchema> {}
export type Users = User[];
export type UserId = User['id'];

export interface CreateUsersModel {
	readonly name: string;
}

export interface FetchUsersParams {
	readonly username?: string | null;
}

export interface UsersModel {
	readonly usersAtom: Atom<Users>;
	readonly pendingAtom: Atom<boolean>;
	readonly errorAtom: Atom<Error | null>;
	readonly changeParams: Action<[params: FetchUsersParams], void>;
}
