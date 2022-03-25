import { useEffect } from "react";
import { useStore } from "effector-react";
import {
	$TasksProgress,
	loadTasksProgress,
	subscribeChangeProgress,
} from "@/models/Progress";
import { useParams } from "react-router-dom";

export const useTasksProgress = () => {
	const tasksProgress = useStore($TasksProgress);
	const { id: roomId } = useParams();

	useEffect(() => {
		if (roomId) {
			loadTasksProgress(roomId);
			subscribeChangeProgress(roomId);
		}
	}, [roomId]);

	return tasksProgress;
};
