import { Literal, Number, Record, Static, Union } from 'runtypes';

import { InRoomParams, StandardResponse } from '@/shared/types';

import { user } from '../auth';
import { room } from '../rooms';

export const invitationStatus = Union(
	Literal('sended'),
	Literal('approved'),
	Literal('rejected')
);

export type InvitationStatus = Static<typeof invitationStatus>;

export const invitation = Record({
	id: Number,
	room,
	user,
	inviter: user,
	status: invitationStatus,
});

export interface Invitation extends Static<typeof invitation> {}

export type GetAllInvitationsRequestParams = InRoomParams;

export type GetAllInvitationsResponseData = Promise<
	StandardResponse<Invitation[]>
>;

export interface GetInvitationViaTokenRequestParams {
	readonly token: string;
}

export type GetInvitationViaTokenResponseData = Promise<
	StandardResponse<Invitation>
>;

export type GenerateLinkRequestParams = InRoomParams;

export type GenerateLinkResponseData = Promise<StandardResponse<string>>;

export interface InviteUserRequestParams extends InRoomParams {
	readonly userId: number;
}

export type InviteUserResponseData = Promise<StandardResponse<Invitation>>;

export interface ApproveInvitationRequestParams {
	readonly id: number;
}

export type ApproveInvitationResponseData = Promise<StandardResponse<boolean>>;

export interface RejectInvitationRequestParams {
	readonly id: number;
}

export type RejectInvitationResponseData = Promise<StandardResponse<boolean>>;

export interface RemoveInvitationRequestParams extends InRoomParams {
	readonly id: number;
}

export type RemoveInvitationResponseData = Promise<StandardResponse<boolean>>;
