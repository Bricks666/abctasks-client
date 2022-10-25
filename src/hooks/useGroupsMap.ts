import { useMemo } from 'react';
import { useQuery } from '@farfetched/react';
import { createGroupsMap, getGroupsQuery } from '@/models/groups';

export const useGroupsMap = () => {
	const { data, ...rest } = useQuery(getGroupsQuery);
	const groupsMap = useMemo(
		() => (data ? createGroupsMap(data) : null),
		[data]
	);

	return {
		data: groupsMap,
		...rest,
	};
};
