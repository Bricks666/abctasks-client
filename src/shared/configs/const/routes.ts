export const getParams = {
	popup: 'popup',
	taskStatus: 'task-status',
	taskId: 'task',
	tagId: 'tag',
	roomId: 'room',
	tab: 'tab',
	userId: 'user',
	before: 'b',
	after: 'a',
	actionId: 'action',
	sphereId: 'sphere',
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
