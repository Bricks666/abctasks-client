import { Rule } from 'effector-forms';
import Joi from 'joi';

export const createRuleFromSchema = <V, T = any>(
	name: string,
	schema: Joi.Schema<T>
): Rule<V> => {
	return {
		name,
		validator: (value) => {
			const result = schema.validate(value);

			if (!result.error) {
				return {
					isValid: true,
				};
			}

			const { details, } = result.error;
			return {
				isValid: false,
				errorText: details.map((error) => error.message).join(','),
			};
		},
	};
};
