import { Task } from '@/shared/models';

export interface TaskFormValues
	extends Pick<Task, 'content' | 'status' | 'groupId'> {}
