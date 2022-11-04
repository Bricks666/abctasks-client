import { AccessOptions } from '@/packages/request';
import { HEX } from '@/types';

export interface CreateGroupRequest extends Required<AccessOptions> {
	readonly roomId: number;
	readonly name: string;
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}

export interface UpdateGroupRequest
	extends Partial<Omit<CreateGroupRequest, 'roomId' | 'accessToken'>>,
		Required<AccessOptions> {
	readonly id: number;
	readonly roomId: number;
}

export interface RemoveGroupRequest extends Required<AccessOptions> {
	readonly id: number;
	readonly roomId: number;
}
