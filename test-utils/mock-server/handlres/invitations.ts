/* eslint-disable import/no-extraneous-dependencies */
import { http } from 'msw';

import {
	createInvitationLink,
	defaultInvitation,
	invitations
} from '../../fixtures';
import { BASE_URL } from '../constants';
import { createStandardResponse, createUrl, notFoundError } from '../utils';

const baseUrl = createUrl(BASE_URL, 'invitations');
const getAllUrl = createUrl(baseUrl, ':roomId');
const getOneUrl = createUrl(baseUrl, ':roomId', ':id');
const inviteUrl = createUrl(baseUrl, 'invite', ':roomId');
const removeUrl = createUrl(baseUrl, 'invite', ':roomId', ':id');
const rejectUrl = createUrl(baseUrl, 'invite', 'reject');
const approveUrl = createUrl(baseUrl, 'invite', 'approve');
const generateLinkUrl = createUrl(
	baseUrl,
	'invite',
	':roomId',
	'generate-link'
);

export const success = {
	getAll: http.get(getAllUrl, () => {
		return createStandardResponse(invitations);
	}),
	getOne: http.get(getOneUrl, ({ params, }) => {
		const { id, } = params;

		const invitation = invitations.find(
			(invitation) => invitation.id === Number(id)
		);

		return createStandardResponse(invitation);
	}),
	invite: http.post(inviteUrl, () => {
		return createStandardResponse(defaultInvitation);
	}),
	remove: http.delete(removeUrl, () => {
		return createStandardResponse(true);
	}),
	reject: http.put(rejectUrl, () => {
		return createStandardResponse(true);
	}),
	approve: http.put(approveUrl, () => {
		return createStandardResponse(true);
	}),
	generateLink: http.post(generateLinkUrl, ({ params, }) => {
		return createStandardResponse(createInvitationLink(+params.roomId));
	}),
};

export const error = {
	approve: http.put(approveUrl, () => {
		return notFoundError;
	}),
	reject: http.put(rejectUrl, () => {
		return notFoundError;
	}),
	remove: http.delete(removeUrl, () => {
		return notFoundError;
	}),
};

export const standard = Object.values(success);
