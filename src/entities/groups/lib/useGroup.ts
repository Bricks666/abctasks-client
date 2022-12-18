import { useMemo } from 'react';
import { useGroupsMap } from './useGroupsMap';

export const useGroup = (roomId: number, groupId: number) => {
	const { data: groupsMap, ...state } = useGroupsMap(roomId);
	const data = useMemo(() => {
		return groupsMap[groupId] ?? null;
	}, [groupsMap, groupId]);

	return { ...state, data, };
};
