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
import { createRuleFromSchema, isHttpErrorCode } from '@/shared/lib';
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
			'string.empty': 'empty',
			'string.pattern.base': 'pattern',
			'string.email': 'email',
			'string.min': 'min_length',
			'string.max': 'max_length',
		}),
	username: Joi.string()
		.min(MIN_LENGTH)
		.max(MAX_SHORT_LENGTH)
		.required()
		.messages({
			'string.empty': 'empty',
			'string.pattern.base': 'pattern',
			'string.min': 'min_length',
			'string.max': 'max_length',
		}),
	password: Joi.string()
		.pattern(ALLOWED_SYMBOLS)
		.min(MIN_LENGTH)
		.max(MAX_SHORT_LENGTH)
		.required()
		.messages({
			'string.empty': 'empty',
			'string.pattern.base': 'pattern',
			'string.min': 'min_length',
			'string.max': 'max_length',
		}),
	repeatPassword: Joi.string().messages({
		'any.only': 'equal',
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
			rules: [createRuleFromSchema('username', schemas.extract('username'))],
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
			if (isHttpErrorCode(error, 409)) {
				return 'exists';
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
