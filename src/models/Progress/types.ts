import { ID } from '@/types/common';

export interface TaskProgressStructure {
	readonly groupId: ID;
	readonly completedCount: number;
	readonly totalCount: number;
}
