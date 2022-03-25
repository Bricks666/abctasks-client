import { useStore } from "effector-react";
import { useEffect } from "react";
import { $Tasks, loadTasks } from "@/models/Tasks/";
import { useParams } from "react-router-dom";

export const useTasks = () => {
	const tasks = useStore($Tasks);
	const { id: roomId } = useParams();

	useEffect(() => {
		if (!tasks.length && roomId) {
			loadTasks(roomId);
		}
	}, [tasks.length, roomId]);

	return tasks;
};
