import { ID } from "@/interfaces/common";
import { $TaskGroupsMap, loadTaskGroups } from "@/models/Groups";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const useGroup = (id: ID | null) => {
	const groups = useStore($TaskGroupsMap);
	const length = Object.values(groups).length;
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
