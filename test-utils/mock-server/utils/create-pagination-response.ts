/* eslint-disable import/no-extraneous-dependencies */
import { HttpResponse } from 'msw';

import { createStandardResponse } from './create-standard-response';

export const createPaginationResponse = (
	items: unknown[],
	limit = 50,
	totalCount = items.length + limit
): HttpResponse => {
	return createStandardResponse({
		items,
		limit,
		totalCount,
	});
};
