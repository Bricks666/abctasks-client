import {
	$Activities,
	loadActivities,
	subscribeNewActivity,
} from "@/models/Activities";
import { CloseConnect } from "@/packages/eventSource";
import { useStore } from "effector-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export const useActivities = () => {
	const activities = useStore($Activities);
	const { id: roomId } = useParams();
	const closeRef = useRef<CloseConnect | null>(null);

	useEffect(() => {
		if (roomId) {
			loadActivities(roomId);
			subscribeNewActivity({ roomId, closeRef });
		}
		return () => {
			closeRef.current && closeRef.current();
			closeRef.current = null;
		};
	}, [roomId]);

	return activities;
};
