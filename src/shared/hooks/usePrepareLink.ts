import { useUnit } from 'effector-react';
import { router } from '@/models';
import { prepareLink, PrepareLinkParams } from '@/utils';

export const usePrepareLink = (options: PrepareLinkParams = {}): string => {
	const path = useUnit(router.$path);
	const query = useUnit(router.$query);

	return prepareLink(
		{
			path,
			query,
		},
		options
	);
};
