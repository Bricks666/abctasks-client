import { ActivityActionDto, ActivitySphereDto } from '@/shared/api';

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
