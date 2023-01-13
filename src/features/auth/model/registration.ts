import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createForm } from 'effector-forms';
import Joi from 'joi';
import { authApi, RegistrationParams, user, User } from '@/shared/api';
import {
	allowedSymbolsRegExp,
	minLoginPasswordLength,
	maxLoginPasswordLength
} from '@/shared/configs';
import { createRuleFromSchema } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const registrationDomain = createDomain();

const handlerFx = registrationDomain.effect<
	RegistrationParams,
	StandardResponse<User>
>();
handlerFx.use(authApi.registration);

export const mutation = createMutation<
	RegistrationParams,
	StandardResponse<User>,
	StandardResponse<User>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(user)),
});

const schemas = {
	login: Joi.string()
		.pattern(allowedSymbolsRegExp)
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
	repeatPassword: Joi.string() /* .valid(Joi.ref('password')) */
		.messages({
			'any.only': 'Password must be equal',
		}),
};

export const form = createForm<RegistrationParams>({
	fields: {
		login: {
			init: '',
			rules: [createRuleFromSchema('login', schemas.login)],
		},
		password: {
			init: '',
			rules: [createRuleFromSchema('password', schemas.password)],
		},
		repeatPassword: {
			init: '',
			rules: [createRuleFromSchema('repeatPassword', schemas.repeatPassword)],
		},
	},
});

sample({
	clock: form.submit,
	source: form.$values,
	filter: form.$isValid,
	target: mutation.start,
});

sample({
	clock: mutation.finished.failure,
	fn: () => '',
	target: [form.fields.password.$value, form.fields.repeatPassword.$value],
});
