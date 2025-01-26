import { AsyncAction, Atom } from '@reatom/framework';

import { FieldAtom } from '@reatom/form';

export interface RegistrationModel {
	readonly submit: AsyncAction<[], void>;
	readonly submittingAtom: Atom<boolean>;
	readonly email: FieldAtom<string>;
	readonly username: FieldAtom<string>;
	readonly password: FieldAtom<string>;
	readonly repeatPassword: FieldAtom<string>;
}
