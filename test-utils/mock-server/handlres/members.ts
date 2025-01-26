/* eslint-disable import/no-extraneous-dependencies */
import { http } from 'msw';

import { members } from '../../fixtures';
import { BASE_URL } from '../constants';
import { createUrl, createStandardResponse, notFoundError } from '../utils';

const baseUrl = createUrl(BASE_URL, 'members', ':roomId');
const getMembersUrl = baseUrl;
const exitMembersUrl = createUrl(baseUrl, 'exit');
const removeMemberUrl = createUrl(baseUrl, 'remove', ':userId');

export const success = {
	members: http.get(getMembersUrl, () => {
		return createStandardResponse(structuredClone(members));
	}),
	exit: http.delete(exitMembersUrl, () => {
		return createStandardResponse(true);
	}),
	remove: http.delete(removeMemberUrl, () => {
		return createStandardResponse(true);
	}),
};

export const error = {
	members: http.get(getMembersUrl, () => {
		return notFoundError;
	}),
	exit: http.delete(exitMembersUrl, () => {
		return notFoundError;
	}),
	remove: http.delete(removeMemberUrl, () => {
		return notFoundError;
	}),
};

export const standard = Object.values(success);
