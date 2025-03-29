import { atom } from '@reatom/framework';
import { molecule } from 'bunshi';
import zod from 'zod';

import { reatomZodForm } from '@reatom/form';

import { authApi } from '@/shared/api';
import { MIN_LENGTH, MAX_SHORT_LENGTH } from '@/shared/configs';
import { constructName, isHttpErrorCode } from '@/shared/lib';

import { RegistrationModel } from './types';

const schema = zod
	.object({
		email: zod.string().email('email').nonempty('empty'),
		username: zod
			.string()
			.min(MIN_LENGTH, 'min_length')
			.max(MAX_SHORT_LENGTH, 'max_length')
			.nonempty('empty'),
		password: zod
			.string()
			.min(MIN_LENGTH, 'min_length')
			.max(MAX_SHORT_LENGTH, 'max_length')
			.nonempty('empty'),
		repeatPassword: zod.string(),
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: 'equal',
		path: ['repeatPassword'],
	});

const modelName = 'registration-form';

export const Molecule = molecule((): RegistrationModel => {
	const form = reatomZodForm(
		{
			username: '',
			email: '',
			password: '',
			repeatPassword: '',
		},
		{
			name: modelName,
			resetOnSubmit: false,
			schema,
			onSubmit: async (ctx, state) => {
				try {
					await authApi.registration(state);
				} catch (error) {
					if (isHttpErrorCode(error, 409)) {
						form.fields.email.validation.merge(ctx, { error: 'exists', });
					}

					throw error;
				} finally {
					form.fields.password.reset(ctx);
					form.fields.repeatPassword.reset(ctx);
				}
			},
		}
	);

	const { submit, } = form;
	const { statusesAtom, } = submit;
	const { email, password, repeatPassword, username, } = form.fields;

	const submittingAtom = atom(
		(ctx) => ctx.spy(statusesAtom).isPending,
		constructName(modelName, 'submittingAtom')
	);

	return {
		submit,
		submittingAtom,
		email,
		password,
		repeatPassword,
		username,
	};
});
