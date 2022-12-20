import { useMemo } from 'react';
import { useGroupsMap } from './useGroupsMap';

export const useGroup = (groupId: number) => {
	const { data: groupsMap, ...query } = useGroupsMap();
	const data = useMemo(() => {
		return groupsMap[groupId] ?? null;
	}, [groupsMap, groupId]);

	return { ...query, data, };
};
