import { ZodSchema, ZodError } from 'zod';

import {
	FormOptions,
	reatomForm,
	Form,
	FormInitState,
	FormState,
} from './reatom-form';

export interface ZodFormOptions<
	T extends FormInitState,
	Schema extends ZodSchema<FormState<T>>
> extends FormOptions<T> {
	readonly schema: Schema;
}

export const reatomZodForm = <
	T extends FormInitState,
	Schema extends ZodSchema<FormState<T>>
>(
	initState: T,
	options: ZodFormOptions<T, Schema>
): Form<T> => {
	const { schema, ...rest } = options;

	const form = reatomForm(initState, {
		...rest,
		validate: async (ctx, state) => {
			return schema.parseAsync(state).catch((error) => {
				if (error instanceof ZodError) {
					error.issues.forEach((issue) => {
						form.fields[issue.path[0] as keyof Schema].validation.merge(ctx, {
							error: issue.message,
						});
					});
				}

				throw error;
			});
		},
	});

	return form;
};
