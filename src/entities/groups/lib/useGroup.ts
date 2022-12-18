import { useMemo } from 'react';
import { useGroupsMap } from './useGroupsMap';

export const useGroup = (roomId: number, groupId: number) => {
	const { data: groupsMap, } = useGroupsMap(roomId);
	return useMemo(() => {
		return groupsMap[groupId] ?? null;
	}, [groupsMap, groupId]);
};
