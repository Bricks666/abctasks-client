import {
	ActivityActionDto,
	ActivityDto,
	ActivitySphereDto
} from '@/shared/api';

import { defaultRoom } from './rooms';
import { defaultUser } from './users';

export const actions: ActivityActionDto[] = [
	{
		id: 1,
		name: 'created',
	},
	{
		id: 2,
		name: 'updated',
	},
	{
		id: 3,
		name: 'removed',
	}
];

export const spheres: ActivitySphereDto[] = [
	{
		id: 1,
		name: 'task',
	},
	{
		id: 2,
		name: 'comment',
	},
	{
		id: 3,
		name: 'tag',
	}
];

export const activities: ActivityDto[] = [
	{
		id: 1,
		action: actions[0],
		sphere: spheres[0],
		roomId: defaultRoom.id,
		activist: defaultUser,
		createdAt: '2022-11-12T12:28:01',
	},
	{
		id: 2,
		action: actions[1],
		sphere: spheres[0],
		roomId: defaultRoom.id,
		activist: defaultUser,
		createdAt: '2022-11-13T12:28:01',
	},
	{
		id: 3,
		action: actions[1],
		sphere: spheres[1],
		roomId: defaultRoom.id,
		activist: defaultUser,
		createdAt: '2022-11-13T14:28:01',
	}
];
