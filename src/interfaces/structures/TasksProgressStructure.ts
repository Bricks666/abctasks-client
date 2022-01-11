import { GroupStructure } from ".";

export interface TaskProgressStructure {
	id: number;
	group: GroupStructure;
	completedCount: number;
	totalCount: number;
}
