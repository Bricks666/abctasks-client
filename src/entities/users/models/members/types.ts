import { Action, Atom } from '@reatom/framework';

import { StandardResponse } from '@/shared/types';

import { Users } from '../users';

export interface CreateMembersModelParams {
	readonly roomId: number;
}

export interface MembersModel {
	readonly membersAtom: Atom<Users>;
	readonly pendingAtom: Atom<boolean>;
	readonly errorAtom: Atom<Error | null>;
	readonly retry: Action<[after?: number], Promise<StandardResponse<Users>>>;
}
