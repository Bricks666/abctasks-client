import { Task, Tasks } from '@/shared/api';

import { generateId } from './generate-id';
import { defaultMember } from './members';
import { defaultTag, tags } from './tags';

export const tasks: Tasks = [
	{
		id: 1,
		roomId: 1,
		tags: [defaultTag],
		author: defaultMember,
		title: 'Title 1',
		description: 'Description 1',
		status: 'done',
		createdAt: new Date().toString(),
		updatedAt: new Date().toString(),
	},
	{
		id: 2,
		roomId: 1,
		tags: tags.slice(2),
		author: defaultMember,
		title: 'Title 2',
		description: 'Description 2',
		status: 'ready',
		createdAt: new Date().toString(),
		updatedAt: null,
	}
];

export const defaultTask = tasks[0];

export const createTask = (task?: Partial<Task>): Task => {
	return {
		...defaultTask,
		id: generateId(),
		createdAt: new Date(),
		updatedAt: null,
		...task,
	};
};
