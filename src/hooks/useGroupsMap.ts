import { useMemo } from 'react';
import { createGroupsMap, getGroupsQuery } from '@/models/groups';
import { useImminentlyQuery } from './useImminentlyQuery';

export const useGroupsMap = (roomId: number) => {
	const { data, ...rest } = useImminentlyQuery(getGroupsQuery, roomId, roomId);
	const groupsMap = useMemo(
		() => (data ? createGroupsMap(data) : null),
		[data]
	);

	return {
		data: groupsMap,
		...rest,
	};
};
