import { Task } from '@/models';

export interface TaskFormValues
	extends Pick<Task, 'content' | 'status' | 'groupId'> {}
