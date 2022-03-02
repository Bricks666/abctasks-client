interface GetParams {
	readonly popup: string;
	readonly taskStatus: string;
	readonly taskId: string;
}

export const GET_PARAMS: GetParams = {
	popup: "popup",
	taskStatus: "task-status",
	taskId: "task-id",
};

interface Popups {
	readonly createTask: string;
	readonly editTask: string;
	readonly groups: string;
}

export const POPUPS: Popups = {
	createTask: "create-task",
	editTask: "edit-task",
	groups: "groups",
};
