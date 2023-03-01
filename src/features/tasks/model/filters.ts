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
		authorIds: {
			init: [],
		},
		before: {
			init: null,
		},
		tagIds: {
			init: [],
		},
	},
	domain: tasksFilters,
});
