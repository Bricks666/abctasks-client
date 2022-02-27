import { HEX } from "@/interfaces/common";

export interface TaskGroup {
	readonly id: number;
	readonly name: string;
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}

export interface TaskGroupsMap {
	[id: number]: TaskGroup;
}
