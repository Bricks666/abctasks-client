import { TaskProgressStructure } from "../models/TasksProgress";
import { mockIllustrationGroup, mockUIGroup } from "./mockGroups";

export const mockTasksProgress: TaskProgressStructure[] = [
	{
		id: 1,
		group: mockUIGroup,
		completedCount: 1,
		totalCount: 10,
	},
	{
		id: 2,
		group: mockIllustrationGroup,
		completedCount: 5,
		totalCount: 10,
	},
];
