import type { TaskStatus } from './types';

export const TASK_STATUSES = {
	done: 'done',
	inProgress: 'in_progress',
	review: 'review',
	ready: 'ready',
} satisfies Record<string, TaskStatus>;
