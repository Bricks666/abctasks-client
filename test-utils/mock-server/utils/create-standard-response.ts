/* eslint-disable import/no-extraneous-dependencies */
import { HttpResponse } from 'msw';

export const createStandardResponse = (data: unknown): HttpResponse => {
	return HttpResponse.json({
		data,
		statusCode: 200,
	});
};
