export const GET_PARAMS = {
	popup: 'popup',
	taskStatus: 'task-status',
	taskId: 'task-id',
	groupId: 'group-id',
	roomId: 'room-id',
	tab: 'tab',
} as const;

export const POPUPS = {
	createTask: 'create-task',
	updateTask: 'update-task',
	groups: 'groups',
	createGroup: 'create-group',
	updateGroup: 'update-group',
	createRoom: 'create-room',
	updateRoom: 'update-room',
} as const;

export const ROUTES = {
	ROOMS: 'rooms',
	ROOM: 'rooms/:id',
	LOGIN: 'login',
	REGISTRATION: 'registration',
	SETTINGS: 'settings/*',
	SETTINGS_PROFILE: 'profile',
	SETTINGS_GENERIC: 'generic',
	NOT_FOUND: '*',
} as const;
