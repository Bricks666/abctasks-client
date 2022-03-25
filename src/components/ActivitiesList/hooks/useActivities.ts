import { $Activities, loadActivities } from "@/models/Activities";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const useActivities = () => {
	const activities = useStore($Activities);
	const { id: roomId } = useParams();

	useEffect(() => {
		if (roomId) {
			loadActivities(roomId);
		}
	}, [roomId]);

	return activities;
};
