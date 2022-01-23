import { TaskStructure } from "../models/Tasks";
import { TaskProgressStructure } from "../models/TasksProgress";
import { mockServerResponse, mockTasks, mockTasksProgress } from "../mocks";

export const getTasksProgress = async (): Promise<TaskProgressStructure[]> => {
	return await mockServerResponse(mockTasksProgress, 3000);
};
export const getTasks = async (): Promise<TaskStructure[]> => {
	return await mockServerResponse(mockTasks, 3000);
};
