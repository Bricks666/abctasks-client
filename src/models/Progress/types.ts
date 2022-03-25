import { ID } from "@/interfaces/common";

export interface TaskProgressStructure {
	readonly groupId: ID;
	readonly completedCount: number;
	readonly totalCount: number;
}
