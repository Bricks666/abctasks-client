import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createForm } from 'effector-forms';
import Joi from 'joi';
import { splitMap } from 'patronum';

import { authApi, authResponse, AuthResponse, LoginParams } from '@/shared/api';
import { MAX_SHORT_LENGTH, MIN_LENGTH } from '@/shared/configs';
import { createRuleFromSchema, isHttpErrorCode } from '@/shared/lib';
import { sessionModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const loginDomain = createDomain();

const handlerFx = loginDomain.effect<
	LoginParams,
	StandardResponse<AuthResponse>
>(authApi.login);

export const mutation = createMutation<
	LoginParams,
	StandardResponse<AuthResponse>,
	StandardResponse<AuthResponse>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(authResponse)),
});

const schemas = {
	email: Joi.string()
		.email({ tlds: { allow: false, }, })
		.min(MIN_LENGTH)
		.max(MAX_SHORT_LENGTH)
		.required()
		.messages({
			'string.empty': 'empty',
			'string.email': 'email',
			'string.min': 'min_length',
			'string.max': 'max_length',
		}),
	password: Joi.string()
		.min(MIN_LENGTH)
		.max(MAX_SHORT_LENGTH)
		.required()
		.messages({
			'string.empty': 'empty',
			'string.pattern.base': 'pattern',
			'string.min': 'min_length',
			'string.max': 'max_length',
		}),
	rememberMe: Joi.boolean(),
};

export const form = createForm<LoginParams>({
	fields: {
		email: {
			init: '',
			rules: [createRuleFromSchema('email', schemas.email)],
		},
		password: {
			init: '',
			rules: [createRuleFromSchema('password', schemas.password)],
		},
		rememberMe: {
			init: false,
			rules: [createRuleFromSchema('remember', schemas.rememberMe)],
		},
	},
	domain: loginDomain,
});

sample({
	clock: form.formValidated,
	target: mutation.start,
});

sample({
	clock: mutation.finished.success,
	fn: ({ result, }) => result.data.user,
	target: sessionModel.query.start,
});

const errors = splitMap({
	source: mutation.finished.failure,
	cases: {
		incorrectPassword: ({ error, }) => {
			if (isHttpErrorCode(error, 403)) {
				return 'incorrect_password';
			}
		},

		userNotFound: ({ error, }) => {
			if (isHttpErrorCode(error, 404)) {
				return 'not_found';
			}
		},
	},
});

sample({
	clock: errors.userNotFound,
	fn: (message) => ({
		rule: 'server',
		errorText: message,
	}),
	target: form.fields.email.addError,
});

sample({
	clock: errors.incorrectPassword,
	fn: (message) => ({
		rule: 'server',
		errorText: message,
	}),
	target: form.fields.password.addError,
});
