interface GetParams {
	readonly popup: string;
	readonly taskStatus: string;
	readonly taskId: string;
	readonly groupId: string;
}

export const GET_PARAMS: GetParams = {
	popup: "popup",
	taskStatus: "task-status",
	taskId: "task-id",
	groupId: "group-id",
};

interface Popups {
	readonly createTask: string;
	readonly editTask: string;
	readonly groups: string;
	readonly createGroup: string;
	readonly editGroup: string;
}

export const POPUPS: Popups = {
	createTask: "create-task",
	editTask: "edit-task",
	groups: "groups",
	createGroup: "create-group",
	editGroup: "edit-group",
};

export const ROUTES = {
	ROOMS: "*",
	ROOM: "room/:id",
	LOGIN: "login",
	REGISTRATION: "registration",
	SETTINGS: "settings/*",
	SETTINGS_PROFILE: "profile",
	SETTINGS_GENERIC: "generic",
};
