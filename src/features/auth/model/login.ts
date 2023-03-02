import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createForm } from 'effector-forms';
import Joi from 'joi';
import { splitMap } from 'patronum';
import { authModel } from '@/entities/auth';
import { authApi, authResponse, AuthResponse, LoginParams } from '@/shared/api';
import {
	allowedSymbolsRegExp,
	maxLoginPasswordLength,
	minLoginPasswordLength,
	tokenModel
} from '@/shared/configs';
import { createRuleFromSchema } from '@/shared/lib';
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
		.min(minLoginPasswordLength)
		.max(maxLoginPasswordLength)
		.required()
		.messages({
			'string.empty': 'Login must be provided',
			'string.pattern.base':
				'Login can only contain latins alphas, numeric and !, *, (, ), _, +',
			'string.min': `Login must contain minimum ${minLoginPasswordLength} symbols`,
			'string.max': `Login must contain maximum ${maxLoginPasswordLength} symbols`,
		}),
	password: Joi.string()
		.pattern(allowedSymbolsRegExp)
		.min(minLoginPasswordLength)
		.max(maxLoginPasswordLength)
		.required()
		.messages({
			'string.empty': 'Password must be provided',
			'string.pattern.base':
				'Password can only contain latins alphas, numeric and !, *, (, ), _, +',
			'string.min': `Password must contain minimum ${minLoginPasswordLength} symbols`,
			'string.max': `Password must contain maximum ${maxLoginPasswordLength} symbols`,
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
	fn: ({ result, }) => result.data.tokens.accessToken,
	target: tokenModel.setToken,
});

sample({
	clock: mutation.finished.success,
	fn: ({ result, }) => result.data.user,
	target: authModel.setUser,
});

const errors = splitMap({
	source: mutation.finished.failure,
	cases: {
		incorrectPassword: ({ error, }) => {
			if ((error as any).statusCode === 401) {
				return 'Incorrect password';
			}
		},

		userNotFound: ({ error, }) => {
			if ((error as any).statusCode === 404) {
				return 'User was not found';
			}
		},
	},
});

sample({
	clock: errors.userNotFound,
	fn: () => false,
	target: form.fields.email.$isValid,
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
	fn: () => false,
	target: form.fields.password.$isValid,
});

sample({
	clock: errors.incorrectPassword,
	fn: (message) => ({
		rule: 'server',
		errorText: message,
	}),
	target: form.fields.password.addError,
});
