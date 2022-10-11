import { Query } from '@farfetched/core';
import { useQuery } from '@farfetched/react';
import { useEffect } from 'react';

export const useImminentlyQuery = <Params, Data, Error>(
	query: Query<Params, Data, Error>,
	params: Params
) => {
	const { start, ...response } = useQuery(query);

	useEffect(() => {
		start(params);
	}, [params]);

	return response;
};
