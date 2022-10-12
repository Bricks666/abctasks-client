/* eslint-disable @typescript-eslint/no-unused-vars */
import { useStore } from 'effector-react';
import { $GroupsMap, getGroupsQuery } from '@/models/groups';
import { useImminentlyQuery } from './useImminentlyQuery';

export const useGroupsMap = (roomId: number) => {
	const { data: _, ...state } = useImminentlyQuery(
		getGroupsQuery,
		roomId,
		roomId
	);
	const groupsMap = useStore($GroupsMap);

	return {
		data: groupsMap,
		...state,
	};
};
