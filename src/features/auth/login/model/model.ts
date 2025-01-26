import { atom, onDisconnect } from '@reatom/framework';
import zod from 'zod';

import { reatomZodForm } from '@reatom/form';

import { authApi } from '@/shared/api';
import { MAX_SHORT_LENGTH, MIN_LENGTH } from '@/shared/configs';
import {
	constructName,
	createSingletonFactory,
	isHttpErrorCode
} from '@/shared/lib';

import { LoginModel } from './types';

const schema = zod.object({
	email: zod.string().email('email').nonempty('empty'),
	password: zod
		.string()
		.min(MIN_LENGTH, 'min_length')
		.max(MAX_SHORT_LENGTH, 'max_length')
		.nonempty('empty'),
	rememberMe: zod.boolean(),
});

const modelName = 'login-form';

export const create = createSingletonFactory(
	(): LoginModel => {
		const form = reatomZodForm(
			{
				email: '',
				password: '',
				rememberMe: false as boolean,
			},
			{
				name: modelName,
				resetOnSubmit: false,
				schema,
				onSubmit: async (ctx, state) => {
					try {
						// @todo Add logic to update session
						await authApi.login(state);
					} catch (error) {
						if (isHttpErrorCode(error, 403)) {
							form.fields.password.validation.merge(ctx, {
								error: 'incorrect_password',
							});
						} else if (isHttpErrorCode(error, 404)) {
							form.fields.email.validation.merge(ctx, {
								error: 'not_found',
							});
						}

						throw error;
					} finally {
						// Save and set validation state again,
						// because field reset is resettings validation state also
						const validation = ctx.get(form.fields.password.validation);

						form.fields.password.reset(ctx);
						form.fields.password.validation(ctx, validation);
					}
				},
			}
		);

		const { submit, } = form;
		const { statusesAtom, } = submit;
		const { email, password, rememberMe, } = form.fields;

		const submittingAtom = atom(
			(ctx) => ctx.spy(statusesAtom).isPending,
			constructName(modelName, 'submittingAtom')
		);

		return {
			submit,
			submittingAtom,
			email,
			rememberMe,
			password,
		};
	},
	{
		key: modelName,
		hooks: {
			staleOn: (result, stale) => onDisconnect(result.email, stale),
		},
	}
);
