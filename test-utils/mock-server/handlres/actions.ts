/* eslint-disable import/no-extraneous-dependencies */
import { http } from 'msw';

import { actions, spheres } from '../../fixtures';
import { BASE_URL } from '../constants';
import { createStandardResponse, createUrl } from '../utils';

const baseUrl = createUrl(BASE_URL, 'activities');
const getActionsUrl = createUrl(baseUrl, 'actions', 'all');
const getSpheresUrl = createUrl(baseUrl, 'spheres', 'all');

export const success = {
	getActions: http.get(getActionsUrl, () => {
		return createStandardResponse(actions);
	}),
	getSpheres: http.get(getSpheresUrl, () => {
		return createStandardResponse(spheres);
	}),
};

export const standard = Object.values(success);
