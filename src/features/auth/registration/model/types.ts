import { FieldAtom } from '@reatom/form';
import { AsyncAction, Atom } from '@reatom/framework';

export interface RegistrationModel {
	readonly submit: AsyncAction<[], void>;
	readonly submittingAtom: Atom<boolean>;
	readonly email: FieldAtom<string>;
	readonly username: FieldAtom<string>;
	readonly password: FieldAtom<string>;
	readonly repeatPassword: FieldAtom<string>;
}
