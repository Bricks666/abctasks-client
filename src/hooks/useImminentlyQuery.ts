import { Query } from '@farfetched/core';
import { useQuery } from '@farfetched/react';
import { useEffect } from 'react';

type UseQueryResult = ReturnType<typeof useQuery>;

export const useImminentlyQuery = <Data, Error, Params>(
	query: Query<Params, Data, Error>,
	params: Params
): Omit<UseQueryResult, 'start'> => {
	const { start, ...response } = useQuery(query);

	useEffect(() => {
		start(params);
	}, [params]);

	return response;
};
