import {
	$Activities,
	loadActivities,
	subscribeNewActivity,
	unsubscribeNewActivity,
} from "@/models/Activities";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const useActivities = () => {
	const activities = useStore($Activities);
	const { id: roomId } = useParams();

	useEffect(() => {
		console.log("ROOMS");
		if (roomId) {
			loadActivities(roomId);
			subscribeNewActivity(roomId);
		}

		return () => {
			debugger;
			unsubscribeNewActivity();
		};
	}, [roomId]);

	return activities;
};
