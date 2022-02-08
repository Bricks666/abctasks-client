import { useStore } from "effector-react";
import { useEffect } from "react";
import { $TaskGroups, loadTaskGroups } from "../models/Tasks";

export const useTaskGroups = () => {
	const groups = useStore($TaskGroups);

	useEffect(() => {
		if (!groups.length) {
			loadTaskGroups();
		}
	}, [groups.length]);
	return groups;
};
