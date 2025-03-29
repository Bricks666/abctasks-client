import { TaskDto, TasksDto } from '@/shared/api';

import { generateId } from './generate-id';
import { defaultMember } from './members';
import { defaultTag, tags } from './tags';

export const tasks: TasksDto = [
	{
		id: 1,
		roomId: 1,
		tags: [defaultTag],
		author: defaultMember,
		title: 'Title 1',
		description: 'Description 1',
		status: 'done',
		// eslint-disable-next-line sonarjs/no-duplicate-string
		createdAt: new Date('2022-09-17').toString(),
		updatedAt: new Date('2022-09-17').toString(),
	},
	{
		id: 2,
		roomId: 1,
		tags: tags.slice(2),
		author: defaultMember,
		title: 'Title 2',
		description: 'Description 2',
		status: 'ready',
		createdAt: new Date('2022-09-17').toString(),
		updatedAt: null,
	}
];

export const defaultTask = tasks[0];

export const createTask = (task?: Partial<TaskDto>): TaskDto => {
	return {
		...defaultTask,
		id: generateId(),
		createdAt: new Date('2022-09-17'),
		updatedAt: null,
		...task,
	};
};
