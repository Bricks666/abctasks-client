import { Action, Atom } from '@reatom/framework';

import { FieldAtom } from '@reatom/form';

export interface LoginModel {
	readonly submit: Action;
	readonly email: FieldAtom<string>;
	readonly password: FieldAtom<string>;
	readonly rememberMe: FieldAtom<boolean>;
	readonly submittingAtom: Atom<boolean>;
}
