import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddType } from '@/types/common';
import { usePrepareLink } from './usePrepareLink';
import { Query } from '@/types/api';

export const useClosePopup = (...keys: string[]) => {
	const navigate = useNavigate();
	const backPath = usePrepareLink({
		keepOldQuery: true,
		deleteQuery: keys.reduce<AddType<Query, boolean>>((query, key) => {
			query[key] = true;
			return query;
		}, {}),
	});

	return useCallback(() => navigate(backPath), [backPath]);
};
