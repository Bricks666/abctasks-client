import { Group, GroupsMap } from './types';

export const createGroupsMap = (groups: Group[]): GroupsMap => {
	return Object.values(groups).reduce<GroupsMap>((map, group) => {
		map[group.id] = group;
		return map;
	}, {});
};
