/* eslint-disable import/no-extraneous-dependencies */
import { HttpResponse } from 'msw';

export const notFoundError = HttpResponse.json(
	{
		message: 'Not Found',
	},
	{ status: 404, statusText: 'Not Found', }
);

export const unauthorizedError = HttpResponse.json(
	{
		message: 'Unauthorized',
	},
	{ status: 401, statusText: 'Unauthorized', }
);

export const forbiddenError = HttpResponse.json(
	{
		message: 'Forbidden',
	},
	{ status: 403, statusText: 'Forbidden', }
);

export const conflictError = HttpResponse.json(
	{
		message: 'Conflict',
	},
	{ status: 409, statusText: 'Conflict', }
);

export const internalServerError = HttpResponse.json(
	{
		message: 'Internal Server Error',
	},
	{ status: 500, statusText: 'Internal Server Error', }
);
