import { ScopeProvider } from 'bunshi/react';
import { useId, type FC, type PropsWithChildren } from 'react';

import { tasksFiltersModel } from '../model';

export const TasksFiltersScopeProvider: FC<PropsWithChildren> = (props) => {
	const { children, } = props;

	const id = useId();

	return (
		<ScopeProvider scope={tasksFiltersModel.FiltersScope} value={id}>
			{children}
		</ScopeProvider>
	);
};
