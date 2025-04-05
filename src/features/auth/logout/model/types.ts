import { AsyncAction, Atom } from '@reatom/framework';

export interface LogoutModel {
	readonly logout: AsyncAction;
	readonly pendingAtom: Atom<boolean>;
	readonly errorAtom: Atom<Error | null>;
}
