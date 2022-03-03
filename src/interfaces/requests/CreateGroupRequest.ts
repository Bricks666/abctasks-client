import { HEX } from "../common";

export interface CreateEditGroupRequest {
	readonly id: number;
	readonly name: string;
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}
