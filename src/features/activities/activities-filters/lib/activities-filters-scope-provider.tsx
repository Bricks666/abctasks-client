import { ScopeProvider } from 'bunshi/react';
import { useId, type FC, type PropsWithChildren } from 'react';

import { activitiesFiltersModel } from '../model';

export const ActivitiesFiltersScopeProvider: FC<PropsWithChildren> = (
	props
) => {
	const { children, } = props;

	const id = useId();

	return (
		<ScopeProvider scope={activitiesFiltersModel.Scope} value={id}>
			{children}
		</ScopeProvider>
	);
};
