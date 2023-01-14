import { createDomain } from 'effector';
import { createForm } from 'effector-forms';
import { GetTasksParams } from '@/shared/api';

const tasksFilters = createDomain();

interface TasksFiltersValues extends Required<Omit<GetTasksParams, 'roomId'>> {}

export const form = createForm<TasksFiltersValues>({
	fields: {
		after: {
			init: null,
		},
		authorId: {
			init: null,
		},
		before: {
			init: null,
		},
		groupId: {
			init: null,
		},
	},
	domain: tasksFilters,
});
