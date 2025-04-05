import type { StandardResponse } from '@/shared/types';

import type { RoomDto } from '../rooms';
import type { UserDto } from '../users';

export type InvitationStatusDto = 'sended' | 'approved' | 'rejected';

export interface InvitationDto {
	readonly id: number;
	readonly room: RoomDto;
	readonly user: UserDto | null;
	readonly inviter: UserDto;
	readonly status: InvitationStatusDto;
}
export type InvitationsDto = InvitationDto[];

export interface GetAllInvitationsRequestParams {
	readonly roomId: number;
}
export type GetAllInvitationsResponseData = Promise<
	StandardResponse<InvitationsDto>
>;

export interface GetInvitationViaTokenRequestParams {
	readonly token: string;
}
export type GetInvitationViaTokenResponseData = Promise<
	StandardResponse<InvitationDto>
>;

export interface GenerateInvitationLinkRequestParams {
	readonly roomId: number;
}
export type GenerateInvitationLinkResponseData = Promise<
	StandardResponse<string>
>;

export interface InviteUserRequestParams {
	readonly roomId: number;
	readonly userId: number;
}
export type InviteUserResponseData = Promise<StandardResponse<InvitationDto>>;

export interface ApproveInvitationRequestParams {
	readonly id: number;
}
export type ApproveInvitationResponseData = Promise<StandardResponse<boolean>>;

export interface RejectInvitationRequestParams {
	readonly id: number;
}
export type RejectInvitationResponseData = Promise<StandardResponse<boolean>>;

export interface RemoveInvitationRequestParams {
	readonly roomId: number;
	readonly id: number;
}
export type RemoveInvitationResponseData = Promise<StandardResponse<boolean>>;
