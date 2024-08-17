/* eslint-disable import/no-extraneous-dependencies */
import { http } from 'msw';

import { createTask, tags, tasks } from '../../fixtures';
import { BASE_URL } from '../constants';
import {
	createStandardResponse,
	createUrl,
	internalServerError,
	notFoundError
} from '../utils';

const baseUrl = createUrl(BASE_URL, 'tasks', ':roomId');
const getAllUrl = baseUrl;
const getOneUrl = createUrl(baseUrl, ':id');
const createTaskUrl = createUrl(baseUrl, 'create');
const updateUrl = createUrl(baseUrl, ':id', 'update');
const removeUrl = createUrl(baseUrl, ':id', 'remove');

export const success = {
	getAll: http.get(getAllUrl, () => {
		return createStandardResponse(tasks);
	}),
	getOne: http.get(getOneUrl, ({ params, }) => {
		const { id, } = params;
		const task = tasks.find((task) => task.id === Number(id));

		return createStandardResponse(task);
	}),
	create: http.post(createTaskUrl, async ({ request, }) => {
		const { title, tagIds, status, description, } =
			(await request.json()) as any;
		const taskTags = tags.filter((tag) => tagIds.includes(tag.id));
		const task = createTask({
			tags: taskTags,
			title,
			description,
			status,
		});

		return createStandardResponse(task);
	}),
	update: http.put(updateUrl, async ({ request, params, }) => {
		const { title, tagIds, status, description, } =
			(await request.json()) as any;
		const { id, } = params;
		const task = tasks.find((task) => task.id === Number(id));
		const taskTags = tags.filter((tag) => tagIds.includes(tag.id));
		const updatedTask = {
			...task,
			tags: taskTags,
			title,
			description,
			status,
			updatedAt: new Date(),
		};

		return createStandardResponse(updatedTask);
	}),
	remove: http.delete(removeUrl, () => {
		return createStandardResponse(true);
	}),
};

export const error = {
	create: http.post(createTaskUrl, async () => {
		return internalServerError;
	}),
	update: http.put(updateUrl, async () => {
		return notFoundError;
	}),
	remove: http.delete(removeUrl, () => {
		return notFoundError;
	}),
};

export const standard = Object.values(success);
