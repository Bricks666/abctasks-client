/* eslint-disable no-underscore-dangle */
import { Query } from '@farfetched/core';
import { useQuery } from '@farfetched/react';
import { useStore } from 'effector-react';
import { useEffect } from 'react';

export const useImminentlyQuery = <Params, Data, Error>(
	query: Query<Params, Data, Error>,
	params: Params,
	...refetchOn: unknown[]
) => {
	const { start, ...response } = useQuery(query);
	const status = useStore(query.$status);
	const loading = status === 'initial' || status === 'pending';

	useEffect(() => {
		start(params);
	}, refetchOn);

	return { ...response, status, loading };
};
