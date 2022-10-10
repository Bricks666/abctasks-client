interface GetParams {
	readonly popup: string;
	readonly taskStatus: string;
	readonly taskId: string;
	readonly groupId: string;
	readonly roomId: string;
}

export const GET_PARAMS: GetParams = {
	popup: 'popup',
	taskStatus: 'task-status',
	taskId: 'task-id',
	groupId: 'group-id',
	roomId: 'room-id',
};

interface Popups {
	readonly createTask: string;
	readonly editTask: string;
	readonly groups: string;
	readonly createGroup: string;
	readonly editGroup: string;
	readonly createRoom: string;
	readonly editRoom: string;
}

export const POPUPS: Popups = {
	createTask: 'create-task',
	editTask: 'edit-task',
	groups: 'groups',
	createGroup: 'create-group',
	editGroup: 'edit-group',
	createRoom: 'create-room',
	editRoom: 'edit-room',
};

export const ROUTES = {
	ROOMS: 'rooms',
	ROOM: 'rooms/:id',
	LOGIN: 'login',
	REGISTRATION: 'registration',
	SETTINGS: 'settings/*',
	SETTINGS_PROFILE: 'profile',
	SETTINGS_GENERIC: 'generic',
};
