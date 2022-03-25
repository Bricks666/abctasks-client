import { useStore } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { $TaskGroups, loadTaskGroups } from "../models/Groups";

export const useTaskGroups = () => {
	const groups = useStore($TaskGroups);
	const { id: roomId } = useParams();
	useEffect(() => {
		if (!groups.length && roomId) {
			loadTaskGroups(roomId);
		}
	}, [groups.length, roomId]);
	return groups;
};
