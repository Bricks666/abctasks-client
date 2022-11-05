import { useUnit } from 'effector-react';
import { router } from '@/routes';
import { prepareLink, PrepareLinkParams } from '@/utils';

export const usePrepareLink = (options: PrepareLinkParams = {}): string => {
	const pathname = useUnit(router.$path);
	const query = useUnit(router.$query);

	return prepareLink(
		{
			pathname,
			query,
		},
		options
	);
};
