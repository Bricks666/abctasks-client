import zod from 'zod';

export const createStandardResponseSchema = <Shape extends zod.ZodRawShape>(
	T: zod.ZodObject<Shape>
) => {
	return zod
		.object({
			data: T,
			statusCode: zod.number(),
		})
		.readonly();
};

export const createPaginationResponseSchema = <Shape extends zod.ZodRawShape>(
	T: zod.ZodObject<Shape>
) => {
	return createStandardResponseSchema(
		zod
			.object({
				items: zod.array(T),
				totalCount: zod.number(),
				limit: zod.number(),
			})
			.readonly()
	);
};
