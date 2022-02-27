import { $TaskGroupsMap, loadTaskGroups } from "@/models/Groups";
import { useStore } from "effector-react";
import { useEffect } from "react";

export const useGroup = (id: number | null) => {
	const groups = useStore($TaskGroupsMap);
	const length = Object.values(groups).length;

	useEffect(() => {
		if (!length) {
			loadTaskGroups();
		}
	}, [length]);

	if (!id) {
		return null;
	}

	return groups[id] || null;
};
