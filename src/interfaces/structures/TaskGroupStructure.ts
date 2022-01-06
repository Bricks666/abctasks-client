import { HEX } from "../common";

export type Group = "Ready" | "Progress" | "Review" | "Done";

export interface GroupStruct {
	group: Group;
	textColor: HEX;
	backgroundColor: HEX;
}
