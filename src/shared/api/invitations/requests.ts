import { instance } from '../request';

import {
	ApproveInvitationRequestParams,
	ApproveInvitationResponseData,
	GenerateLinkRequestParams,
	GenerateLinkResponseData,
	GetAllInvitationsRequestParams,
	GetAllInvitationsResponseData,
	GetInvitationViaTokenRequestParams,
	GetInvitationViaTokenResponseData,
	InviteUserRequestParams,
	InviteUserResponseData,
	RejectInvitationRequestParams,
	RejectInvitationResponseData,
	RemoveInvitationRequestParams,
	RemoveInvitationResponseData
} from './types';

export const getAll = async ({
	roomId,
}: GetAllInvitationsRequestParams): GetAllInvitationsResponseData => {
	return instance.get(`invitations/${roomId}`).json();
};

export const getViaToken = async ({
	token,
}: GetInvitationViaTokenRequestParams): GetInvitationViaTokenResponseData => {
	return instance.get(`invitations/via/${token}`).json();
};

export const invite = async ({
	roomId,
	userId,
}: InviteUserRequestParams): InviteUserResponseData => {
	return instance
		.post(`invitations/invite/${roomId}`, { json: { userId, }, })
		.json();
};

export const generateLink = async ({
	roomId,
}: GenerateLinkRequestParams): GenerateLinkResponseData => {
	return instance.post(`invitations/invite/${roomId}/generate-link`).json();
};

export const approveInvitation = async ({
	id,
}: ApproveInvitationRequestParams): ApproveInvitationResponseData => {
	return instance
		.put(`invitations/invite/approve`, {
			json: { id, },
		})
		.json();
};

export const rejectInvitation = async ({
	id,
}: RejectInvitationRequestParams): RejectInvitationResponseData => {
	return instance
		.put(`invitations/invite/reject`, {
			json: { id, },
		})
		.json();
};

export const remove = async ({
	roomId,
	id,
}: RemoveInvitationRequestParams): RemoveInvitationResponseData => {
	return instance.delete(`invitations/invite/${roomId}/${id}`).json();
};
