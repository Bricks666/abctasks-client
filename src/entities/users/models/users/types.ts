import zod from 'zod';

export const userSchema = zod
	.object({
		id: zod.number(),
		email: zod.string().email(),
		username: zod.string(),
		photo: zod.string().url().nullable(),
	})
	.readonly();
