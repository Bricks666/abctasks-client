import { Rule } from 'effector-forms';
import Joi from 'joi';
import { beforeEach, describe, expect, test } from 'vitest';

import { createRuleFromSchema } from './create-rule-from-schema';

describe('shared/lib/create-rule-from', () => {
	const name = 'name';
	const schema = Joi.string().not().empty().messages({
		'string.empty': 'Empty',
	});

	let rule: Rule<string>;

	const createRule = () => {
		rule = createRuleFromSchema(name, schema);
	};

	beforeEach(() => {
		createRule();
	});

	test('should create object with right shape', () => {
		expect(rule).toStrictEqual({
			name,
			validator: expect.any(Function),
		});
	});

	test('should return valid result when data passed folow scheme', () => {
		const result = rule.validator('valid');

		expect(result).toStrictEqual({
			isValid: true,
		});
	});

	test('should return invalid result when data passed does no folow scheme', () => {
		const result = rule.validator('');

		expect(result).toStrictEqual({
			isValid: false,
			errorText: 'Empty',
		});
	});
});
