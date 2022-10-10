import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { $TaskGroupsMap, loadTaskGroups } from '@/models/Groups';
import { ID } from '@/interfaces/common';

export const useGroup = (id: ID | null) => {
	const groups = useStore($TaskGroupsMap);
	const { length } = Object.values(groups);
	const { id: roomId } = useParams();

	useEffect(() => {
		if (!length && roomId) {
			loadTaskGroups(roomId);
		}
	}, [length, roomId]);

	if (!id) {
		return null;
	}

	return groups[id] || null;
};
