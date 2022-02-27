import { HEX } from "../common";

export interface CreateGroupRequest {
	readonly name: string;
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}
