export const getParams = {
	popup: 'popup',
	taskStatus: 'task-status',
	taskId: 'task-id',
	groupId: 'group-id',
	roomId: 'room-id',
	tab: 'tab',
	userId: 'user-id',
	before: 'bfr',
	after: 'afr',
	action: 'act',
	sphereName: 'sphere-name',
	count: 'cnt',
	page: 'p',
} as const;

export const popupsMap = {
	createTask: 'create-task',
	updateTask: 'update-task',
	groups: 'groups',
	createGroup: 'create-group',
	updateGroup: 'update-group',
	createRoom: 'create-room',
	updateRoom: 'update-room',
	addUser: 'add-user',
} as const;
