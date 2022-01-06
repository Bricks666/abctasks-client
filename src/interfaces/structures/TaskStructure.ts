import { DateType } from "../common";
import { Group } from ".";

export interface TodoStructure {
	id: number;
	group: Group;
	content: string;
	commentCount: number;
	addedDate: DateType;
}
