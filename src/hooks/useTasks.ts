import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { $Tasks, loadTasks, resetTasks } from '@/models/Tasks/';

export const useTasks = () => {
	const tasks = useStore($Tasks);
	const { id: roomId } = useParams();

	useEffect(() => {
		if (!tasks.length && roomId) {
			loadTasks(roomId);
		}
	}, [tasks.length, roomId]);

	useEffect(() => {
		return () => {
			resetTasks();
		};
	}, []);

	return tasks;
};
