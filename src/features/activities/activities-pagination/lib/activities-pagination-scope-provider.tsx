import { ScopeProvider } from 'bunshi/react';
import { useId, type FC, type PropsWithChildren } from 'react';

import { activitiesPaginationModel } from '../model';

export const ActivitiesPaginationScopeProvider: FC<PropsWithChildren> = (
	props
) => {
	const { children, } = props;

	const id = useId();

	return (
		<ScopeProvider scope={activitiesPaginationModel.Scope} value={id}>
			{children}
		</ScopeProvider>
	);
};
