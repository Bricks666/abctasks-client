/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import * as React from 'react';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { GET_PARAMS } from '@/const';
import { useGetParam, useGoBack, useTask, useTaskGroups } from '@/hooks';
import { CommonProps, ID } from '@/interfaces/common';
import { editTask } from '@/models/Tasks';
import { TaskStatus, TaskStructure } from '@/models/Tasks/types';
import { TaskGroup } from '@/models/Groups/types';
import { Button } from '@/ui/Button';
import { TextField } from '../TextField';
import { useGroup } from '@/hooks/useGroup';
import { validatingScheme } from './validator';

import EditTaskFromStyle from './EditTaskForm.module.css';

export interface EditTaskFormValues {
	readonly content: string;
	readonly groupId: ID;
	readonly status: TaskStatus;
}

const prepareTask = (
	task: TaskStructure | null,
	group: TaskGroup | null
): EditTaskFormValues => {
	return task && group
		? {
				content: task.content,
				groupId: group.id,
				status: task.status,
		  }
		: {
				content: '',
				groupId: 0,
				status: TaskStatus.READY,
		  };
};

const statuses = {
	[TaskStatus.READY]: 'ready',
	[TaskStatus.IN_PROGRESS]: 'inProgress',
	[TaskStatus.REVIEW]: 'review',
	[TaskStatus.DONE]: 'done',
};

export const EditTaskForm: React.FC<CommonProps> = ({ className }) => {
	const taskId = useGetParam(GET_PARAMS.taskId);
	const task = useTask(taskId);
	const group = useGroup(task?.groupId || null);
	const groups = useTaskGroups();
	const goBack = useGoBack();
	const { t } = useTranslation(['popups', 'room']);
	const { register, handleSubmit, formState } = useForm<EditTaskFormValues>({
		defaultValues: prepareTask(task, group),
		resolver: joiResolver(validatingScheme),
	});

	const onSubmit = React.useCallback<SubmitHandler<EditTaskFormValues>>(
		({ groupId, status, ...values }) => {
			editTask({
				...values,
				id: +(taskId as unknown as number),
				status,
				groupId,
				roomId: task?.roomId || 0,
			});
			goBack();
		},
		[goBack, taskId, task?.roomId]
	);
	const { isDirty } = formState;

	return (
		<form
			className={cn(EditTaskFromStyle.form, className)}
			onSubmit={handleSubmit(onSubmit)}>
			<TextField {...register('groupId')} select label={t('edit_task.group')}>
				{groups.map(({ id, name }) => (
					<option value={id} key={id}>
						{name}
					</option>
				))}
			</TextField>
			<TextField {...register('status')} select label={t('edit_task.status')}>
				{Object.entries(statuses).map(([code, name]) => (
					<option value={code} key={code}>
						{t(`statuses.${name}`, { ns: 'room' })}
					</option>
				))}
			</TextField>

			<TextField
				className={EditTaskFromStyle.textarea}
				{...register('content')}
				multiline
				label={t('edit_task.content')}
			/>
			<Button className={EditTaskFromStyle.button} disabled={!isDirty}>
				{t('edit_task.button')}
			</Button>
		</form>
	);
};
