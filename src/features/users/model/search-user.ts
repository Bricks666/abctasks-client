import { createDomain } from 'effector';
import { createForm } from 'effector-forms';
import Joi from 'joi';
import { LoginSearchQuery } from '@/shared/api';
import { createRuleFromSchema } from '@/shared/lib';

const searchUserDomain = createDomain();

const schemas = {
	login: Joi.string().required(),
};

export const form = createForm<LoginSearchQuery>({
	fields: {
		login: {
			init: '',
			rules: [createRuleFromSchema('login', schemas.login)],
		},
	},
	domain: searchUserDomain,
});
