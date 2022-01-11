import { TaskProgressStructure } from "../interfaces/structures";

export const mockTasksProgress: TaskProgressStructure[] = [
	{
		id: 1,
		group: {
			group: "UI",
			backgroundColor: "#ecd8e6",
			textColor: "#d459e8",
		},
		completedCount: 1,
		totalCount: 10,
	},
	{
		id: 2,
		group: {
			group: "Illustration",
			backgroundColor: "#dee7e3",
			textColor: "#46bd84",
		},
		completedCount: 5,
		totalCount: 10,
	},
];
