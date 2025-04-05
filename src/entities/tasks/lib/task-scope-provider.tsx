import { ScopeProvider } from 'bunshi/react';
import { FC, PropsWithChildren } from 'react';

import { TaskId, taskModel } from '../models';

export interface TaskScopeProviderProps extends Required<PropsWithChildren> {
	readonly taskId: TaskId;
}

export const TaskScopeProvider: FC<TaskScopeProviderProps> = (
	props: TaskScopeProviderProps
) => {
	const { children, taskId, } = props;

	return (
		<ScopeProvider scope={taskModel.Scope} value={taskId}>
			{children}
		</ScopeProvider>
	);
};
