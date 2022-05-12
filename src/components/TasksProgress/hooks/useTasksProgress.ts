import { useEffect, useRef } from "react";
import { useStore } from "effector-react";
import {
	$TasksProgress,
	loadTasksProgress,
	subscribeChangeProgress,
} from "@/models/Progress";
import { useParams } from "react-router-dom";
import { CloseConnect } from "@/packages/eventSource";

export const useTasksProgress = () => {
	const tasksProgress = useStore($TasksProgress);
	const { id: roomId } = useParams();
	const closeRef = useRef<CloseConnect | null>(null);

	useEffect(() => {
		if (roomId) {
			loadTasksProgress(roomId);
			subscribeChangeProgress({ roomId, closeRef });
		}

		return () => {
			closeRef.current && closeRef.current();
			closeRef.current = null;
		};
	}, [roomId]);

	return tasksProgress;
};
