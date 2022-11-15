import * as React from 'react';
import { useMutation } from '@farfetched/react';
import { useGate, useUnit } from 'effector-react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	$taskId,
	closeUpdateTaskPopup,
	getTaskQuery,
	TaskGate,
	updateTaskMutation,
} from '@/models';
import { BasePopupProps, CommonProps } from '@/types';
import { roomRoute } from '@/routes';
import { useParam } from '@/hooks';
import { MainPopup } from '@/shared/components';
import { TaskFormValues } from '../TaskForm';
import { StyledForm, StyledSkeleton } from './styles';

export interface UpdateTaskPopupProps extends CommonProps, BasePopupProps {}

export const UpdateTaskPopup: React.FC<UpdateTaskPopupProps> = (props) => {
	const { t } = useTranslation('popups');
	const roomId = useParam(roomRoute, 'id');
	const id = useUnit($taskId)!;
	const onClose = useUnit(closeUpdateTaskPopup);
	const task = useUnit(getTaskQuery.$data);
	const updateTask = useMutation(updateTaskMutation);
	useGate(TaskGate, { id, roomId: Number(roomId) });

	const onSubmit = React.useCallback<SubmitHandler<TaskFormValues>>(
		(values) => {
			updateTask.start({
				...values,
				id,
				roomId: Number(roomId),
			});
		},
		[roomId, id]
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
