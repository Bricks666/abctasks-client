import { $GroupedByStatusTasksStore, loadTasks } from "@/models/Tasks";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const useGroupedTasks = () => {
	const tasks = useStore($GroupedByStatusTasksStore);
	const { id: roomId } = useParams();

	useEffect(() => {
		if (roomId) {
			loadTasks(roomId);
		}
	}, [roomId]);

	return tasks;
};
