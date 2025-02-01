import zod from 'zod';

export const createStandardResponseSchema = <
	Type extends zod.ZodFirstPartySchemaTypes,
>(
		T: Type
	) => {
	return zod
		.object({
			data: T,
			statusCode: zod.number(),
		})
		.readonly();
};

export const createPaginationResponseSchema = <
	Type extends zod.ZodFirstPartySchemaTypes,
>(
		T: Type
	) => {
	return createStandardResponseSchema(
		zod.object({
			items: zod.array(T),
			totalCount: zod.number(),
			limit: zod.number(),
		})
	);
};
