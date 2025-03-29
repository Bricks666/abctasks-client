import { instance } from '../request';

import type {
	ApproveInvitationRequestParams,
	ApproveInvitationResponseData,
	GenerateInvitationLinkRequestParams,
	GenerateInvitationLinkResponseData,
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

export const getAll = async (
	{ roomId, }: GetAllInvitationsRequestParams,
	options?: globalThis.RequestInit
): GetAllInvitationsResponseData => {
	return instance.get(`invitations/${roomId}`, options).json();
};

export const getViaToken = async (
	{ token, }: GetInvitationViaTokenRequestParams,
	options?: globalThis.RequestInit
): GetInvitationViaTokenResponseData => {
	return instance.get(`invitations/via/${token}`, options).json();
};

export const invite = async (
	{ roomId, userId, }: InviteUserRequestParams,
	options?: globalThis.RequestInit
): InviteUserResponseData => {
	return instance
		.post(`invitations/invite/${roomId}`, { json: { userId, }, ...options, })
		.json();
};

export const generateLink = async (
	{ roomId, }: GenerateInvitationLinkRequestParams,
	options?: globalThis.RequestInit
): GenerateInvitationLinkResponseData => {
	return instance
		.post(`invitations/invite/${roomId}/generate-link`, options)
		.json();
};

export const approveInvitation = async (
	{ id, }: ApproveInvitationRequestParams,
	options?: globalThis.RequestInit
): ApproveInvitationResponseData => {
	return instance
		.put(`invitations/invite/approve`, {
			json: { id, },
			...options,
		})
		.json();
};

export const rejectInvitation = async (
	{ id, }: RejectInvitationRequestParams,
	options?: globalThis.RequestInit
): RejectInvitationResponseData => {
	return instance
		.put(`invitations/invite/reject`, {
			json: { id, },
			...options,
		})
		.json();
};

export const remove = async (
	{ roomId, id, }: RemoveInvitationRequestParams,
	options?: globalThis.RequestInit
): RemoveInvitationResponseData => {
	return instance.delete(`invitations/invite/${roomId}/${id}`, options).json();
};
