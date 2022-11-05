import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@farfetched/react';
import { useGate } from 'effector-react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getTaskQuery, TaskGate, updateTaskMutation } from '@/models/tasks';
import { BasePopupProps, CommonProps } from '@/types';
import { useGetParam, useClosePopup } from '@/hooks';
import { routes } from '@/const';
import { MainPopup } from '@/ui/MainPopup';
import { TaskFormValues } from '../TaskForm';
import { StyledForm, StyledSkeleton } from './styles';

export interface UpdateTaskPopupProps extends CommonProps, BasePopupProps {}

export const UpdateTaskPopup: React.FC<UpdateTaskPopupProps> = (props) => {
	const { t } = useTranslation('popups');
	const { id: roomId } = useParams();
	const id = Number(useGetParam(routes.GET_PARAMS.taskId));
	useGate(TaskGate, { id, roomId: Number(roomId) });
	const onClose = useClosePopup(
		routes.GET_PARAMS.taskId,
		routes.GET_PARAMS.popup
	);
	const { data: task } = useQuery(getTaskQuery);
	const updateTask = useMutation(updateTaskMutation);

	const onSubmit = React.useCallback<SubmitHandler<TaskFormValues>>(
		(values) => {
			updateTask.start({
				...values,
				id,
				roomId: Number(roomId),
			});
			onClose();
		},
		[roomId, id, onClose]
	);

	const defaultValues = React.useMemo<TaskFormValues>(
		() => ({
			content: task?.content || '',
			groupId: task?.groupId || 0,
			status: task?.status || 'ready',
		}),
		[task]
	);
	const loading = !task;

	return (
		<MainPopup {...props} onClose={onClose} header={t('task.updateTitle')}>
			{loading ? (
				<StyledSkeleton />
			) : (
				<StyledForm
					onSubmit={onSubmit}
					defaultValues={defaultValues}
					buttonText={t('actions.save', { ns: 'common' })}
				/>
			)}
		</MainPopup>
	);
};
