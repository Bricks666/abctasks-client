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
	readonly updateTask: string;
	readonly groups: string;
	readonly createGroup: string;
	readonly updateGRoup: string;
	readonly createRoom: string;
	readonly updateRoom: string;
}

export const POPUPS: Popups = {
	createTask: 'create-task',
	updateTask: 'update-task',
	groups: 'groups',
	createGroup: 'create-group',
	updateGRoup: 'update-group',
	createRoom: 'create-room',
	updateRoom: 'update-room',
};

export const ROUTES = {
	ROOMS: 'rooms',
	ROOM: 'rooms/:id',
	LOGIN: 'login',
	REGISTRATION: 'registration',
	SETTINGS: 'settings/*',
	SETTINGS_PROFILE: 'profile',
	SETTINGS_GENERIC: 'generic',
	NOT_FOUND: '*',
};
