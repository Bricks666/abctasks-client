import { TaskGroupResponse } from "../interfaces/response";
import { TaskGroup } from "../models/Group";

export const toValidTaskGroup = (taskGroup: TaskGroupResponse): TaskGroup => {
	return {
		id: taskGroup.groupId,
		name: taskGroup.groupName,
		mainColor: taskGroup.groupMainColor,
		secondColor: taskGroup.groupSecondColor,
	};
};
