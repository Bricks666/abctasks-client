/* eslint-disable import/no-extraneous-dependencies */
import { http } from 'msw';

import { createRoom, rooms } from '../../fixtures';
import { BASE_URL } from '../constants';
import {
	createStandardResponse,
	createUrl,
	forbiddenError,
	internalServerError,
	notFoundError
} from '../utils';

const baseUrl = createUrl(BASE_URL, 'rooms');
const getAllUrl = baseUrl;
const getOneUrl = createUrl(baseUrl, ':id');
const getUpdateUrl = createUrl(baseUrl, ':id', 'update');
const getCreateUrl = createUrl(baseUrl, 'create');
const getRemoveUrl = createUrl(baseUrl, ':id', 'remove');

export const success = {
	getAll: http.get(getAllUrl, () => {
		return createStandardResponse(rooms);
	}),
	getOne: http.get(getOneUrl, ({ params, }) => {
		const room = rooms.find((room) => room.id === +params.id);

		return createStandardResponse(room);
	}),
	update: http.put(getUpdateUrl, async ({ params, request, }) => {
		const room = rooms.find((room) => room.id === +params.id);
		const { name, description, } = (await request.json()) as any;

		return createStandardResponse({
			...room,
			name,
			description,
		});
	}),
	create: http.post(getCreateUrl, async ({ request, }) => {
		const { name, description, } = (await request.json()) as any;

		const room = createRoom({
			name,
			description,
			canChange: true,
		});

		return createStandardResponse(room);
	}),
	remove: http.delete(getRemoveUrl, () => {
		return createStandardResponse(true);
	}),
};

export const error = {
	getAll: {
		invalidData: http.get(getAllUrl, () => {
			return createStandardResponse(rooms[0]);
		}),
		internalError: http.get(getAllUrl, () => {
			return internalServerError;
		}),
	},
	getOne: {
		invalidData: http.get(getOneUrl, () => {
			return createStandardResponse(rooms);
		}),
		internalError: http.get(getOneUrl, () => {
			return internalServerError;
		}),
		notFound: http.get(getOneUrl, () => {
			return notFoundError;
		}),
	},
	update: http.put(getUpdateUrl, async () => {
		return notFoundError;
	}),
	create: http.post(getCreateUrl, async () => {
		return internalServerError;
	}),
	remove: http.delete(getRemoveUrl, () => {
		return forbiddenError;
	}),
};

export const standard = Object.values(success);
