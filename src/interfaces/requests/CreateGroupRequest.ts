import { HEX, ID } from "../common";

export interface CreateEditGroupRequest {
	readonly id: ID;
	readonly roomId: ID;
	readonly name: string;
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}

export interface DeleteGroupRequest {
	readonly id: ID;
	readonly roomId: ID;
}
