import { Task } from '@/shared/api';

export interface TaskFormValues
	extends Pick<Task, 'content' | 'status' | 'groupId'> {}
