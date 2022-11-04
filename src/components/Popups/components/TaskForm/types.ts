import { Task } from '@/models/tasks';

export interface TaskFormValues
	extends Pick<Task, 'content' | 'status' | 'groupId'> {}
