import { $Activities, loadActivities } from "@/models/Activities";
import { useStore } from "effector-react";
import { useEffect } from "react";

export const useActivities = () => {
	const activities = useStore($Activities);

	useEffect(() => {
		loadActivities();
	}, []);

	return activities;
};
