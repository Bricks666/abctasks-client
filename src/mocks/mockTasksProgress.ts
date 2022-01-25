import { TaskProgressStructure } from "../models/TasksProgress";
import { mockIllustrationGroup, mockUIGroup } from "./mockGroups";

export const mockTasksProgress: TaskProgressStructure[] = [
	{
		group: mockUIGroup,
		completedCount: 1,
		totalCount: 10,
	},
	{
		group: mockIllustrationGroup,
		completedCount: 5,
		totalCount: 10,
	},
];
