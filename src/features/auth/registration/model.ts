import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createForm } from 'effector-forms';
import Joi from 'joi';
import { splitMap } from 'patronum';

import { authApi, RegistrationParams, user, User } from '@/shared/api';
import {
	ALLOWED_SYMBOLS,
	MIN_LENGTH,
	MAX_SHORT_LENGTH
} from '@/shared/configs';
import { createRuleFromSchema } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const registrationDomain = createDomain();

const handlerFx = registrationDomain.effect<
	RegistrationParams,
	StandardResponse<User>
>(authApi.registration);

export const mutation = createMutation<
	RegistrationParams,
	StandardResponse<User>,
	StandardResponse<User>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(user)),
});

interface RegistrationFormParams extends RegistrationParams {
	readonly repeatPassword: string;
}

const schemas = Joi.object<RegistrationFormParams>({
	email: Joi.string()
		.min(MIN_LENGTH)
		.max(MAX_SHORT_LENGTH)
		.email({ tlds: { allow: false, }, })
		.required()
		.messages({
			'string.empty': 'Login must be provided',
			'string.pattern.base':
				'Login can only contain latins alphas, numeric and !, *, (, ), _, +',
			'string.min': `Login must contain minimum ${MIN_LENGTH} symbols`,
			'string.max': `Login must contain maximum ${MAX_SHORT_LENGTH} symbols`,
		}),
	password: Joi.string()
		.pattern(ALLOWED_SYMBOLS)
		.min(MIN_LENGTH)
		.max(MAX_SHORT_LENGTH)
		.required()
		.messages({
			'string.empty': 'Password must be provided',
			'string.pattern.base':
				'Password can only contain latins alphas, numeric and !, *, (, ), _, +',
			'string.min': `Password must contain minimum ${MIN_LENGTH} symbols`,
			'string.max': `Password must contain maximum ${MAX_SHORT_LENGTH} symbols`,
		}),
	repeatPassword: Joi.string().messages({
		'any.only': 'Password must be equal',
	}),
});

export const form = createForm<RegistrationFormParams>({
	fields: {
		email: {
			init: '',
			rules: [createRuleFromSchema('email', schemas.extract('email'))],
		},
		username: {
			init: '',
		},
		password: {
			init: '',
			rules: [createRuleFromSchema('password', schemas.extract('password'))],
		},
		repeatPassword: {
			init: '',
			rules: [
				createRuleFromSchema(
					'repeatPassword',
					schemas.extract('repeatPassword')
				)
			],
		},
	},
});

sample({
	clock: form.formValidated,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	fn: ({ repeatPassword: _, ...rest }) => rest,
	target: mutation.start,
});

sample({
	clock: mutation.finished.failure,
	fn: () => '',
	target: [form.fields.password.$value, form.fields.repeatPassword.$value],
});

const errors = splitMap({
	source: mutation.finished.failure,
	cases: {
		userAlreadyRegistered: ({ error, }) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			if ((error as any).statusCode === 409) {
				return 'User already registered';
			}
		},
	},
});

sample({
	clock: errors.userAlreadyRegistered,
	fn: () => false,
	target: form.fields.email.$isValid,
});

sample({
	clock: errors.userAlreadyRegistered,
	fn: (message) => ({
		rule: 'server',
		errorText: message,
	}),
	target: form.fields.email.addError,
});
