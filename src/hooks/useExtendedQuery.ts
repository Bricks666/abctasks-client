/* eslint-disable no-underscore-dangle */
import { Query } from '@farfetched/core';
import { useQuery } from '@farfetched/react';
import { useStore } from 'effector-react';

export const useExtendedQuery = <Params, Data, Error>(
	query: Query<Params, Data, Error>
) => {
	const response = useQuery(query);
	const status = useStore(query.$status);

	return { ...response, status };
};
