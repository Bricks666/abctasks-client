export const getParams = {
	popup: 'popup',
	taskStatus: 'task-status',
	taskId: 'task-id',
	groupId: 'group-id',
	roomId: 'room-id',
	tab: 'tab',
} as const;

export const popups = {
	createTask: 'create-task',
	updateTask: 'update-task',
	groups: 'groups',
	createGroup: 'create-group',
	updateGroup: 'update-group',
	createRoom: 'create-room',
	updateRoom: 'update-room',
} as const;
