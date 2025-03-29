/* eslint-disable import/no-extraneous-dependencies */
import { http } from 'msw';

import { createTag, tags } from '../../fixtures';
import { BASE_URL } from '../constants';
import {
	createUrl,
	createStandardResponse,
	internalServerError,
	notFoundError
} from '../utils';

const baseUrl = createUrl(BASE_URL, 'tags', ':roomId');
const getAllUrl = baseUrl;
const getOneUrl = createUrl(baseUrl, ':id');
const createTagUrl = createUrl(baseUrl, 'create');
const updateUrl = createUrl(baseUrl, ':id', 'update');
const removeUrl = createUrl(baseUrl, ':id', 'remove');

export const success = {
	getAll: http.get(getAllUrl, () => {
		return createStandardResponse(tags);
	}),
	getOne: http.get(getOneUrl, ({ params, }) => {
		const { id, } = params;

		const tag = tags.find((tag) => tag.id === Number(id));

		return createStandardResponse(tag);
	}),
	create: http.post(createTagUrl, async ({ request, }) => {
		const { name, mainColor, secondColor, } = (await request.json()) as any;

		const tag = createTag({
			name,
			mainColor,
			secondColor,
		});

		return createStandardResponse(tag);
	}),
	udpate: http.put(updateUrl, async ({ params, request, }) => {
		const tag = tags.find((tag) => tag.id === Number(params.id));
		const { name, mainColor, secondColor, } = (await request.json()) as any;

		return createStandardResponse({
			...tag,
			name,
			mainColor,
			secondColor,
		});
	}),
	remove: http.delete(removeUrl, async () => {
		return createStandardResponse(true);
	}),
};

export const error = {
	getAll: {
		invalidData: http.get(getAllUrl, () => {
			return createStandardResponse({});
		}),
		internalError: http.get(getAllUrl, () => {
			return internalServerError;
		}),
	},
	getOne: {
		invalidData: http.get(getOneUrl, () => {
			return createStandardResponse(null);
		}),
		notFound: http.get(getOneUrl, () => {
			return notFoundError;
		}),
		internalError: http.get(getOneUrl, () => {
			return internalServerError;
		}),
	},
	create: http.post(createTagUrl, async () => {
		return internalServerError;
	}),
	udpate: http.put(updateUrl, async () => {
		return notFoundError;
	}),
	remove: http.delete(removeUrl, async () => {
		return notFoundError;
	}),
};

export const standard = Object.values(success);
