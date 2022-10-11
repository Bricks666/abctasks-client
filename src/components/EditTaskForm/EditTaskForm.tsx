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
import { Button } from '@/ui/Button';
import { TextField } from '../TextField';
import { validatingScheme } from './validator';
import { Select } from '@/ui/Select';

import styles from './EditTaskForm.module.css';

export interface EditTaskFormValues {
	readonly content: string;
	readonly groupId: ID;
	readonly status: TaskStatus;
}

const prepareTask = (task: TaskStructure | null): EditTaskFormValues => {
	return task
		? {
				content: task.content,
				groupId: task.groupId,
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
	const groups = useTaskGroups();
	const goBack = useGoBack();
	const { t } = useTranslation(['popups', 'room']);
	const { register, handleSubmit, formState } = useForm<EditTaskFormValues>({
		defaultValues: prepareTask(task),
		resolver: joiResolver(validatingScheme),
	});

	const onSubmit = React.useCallback<SubmitHandler<EditTaskFormValues>>(
		({ groupId, status, ...values }) => {
			editTask({
				...values,
				id: +taskId!,
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
			className={cn(styles.form, className)}
			onSubmit={handleSubmit(onSubmit)}>
			<Select {...register('groupId')}>
				{groups.map(({ id, name }) => (
					<option value={id} key={id}>
						{name}
					</option>
				))}
			</Select>
			<Select {...register('status')}>
				{Object.entries(statuses).map(([code, name]) => (
					<option value={code} key={code}>
						{t(`statuses.${name}`, { ns: 'room' })}
					</option>
				))}
			</Select>

			<TextField
				className={styles.textarea}
				{...register('content')}
				multiline
				label={t('edit_task.content')}
			/>
			<Button className={styles.button} disabled={!isDirty}>
				{t('edit_task.button')}
			</Button>
		</form>
	);
};
