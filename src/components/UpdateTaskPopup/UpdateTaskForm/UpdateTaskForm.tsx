/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import * as React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useMutation } from '@farfetched/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import {
	getTaskQuery,
	updateTaskMutation,
	TaskStatus,
	Task,
	statuses,
} from '@/models/tasks';
import { getGroupsQuery } from '@/models/groups';
import { GET_PARAMS } from '@/const';
import { useGetParam, useImminentlyQuery } from '@/hooks';
import { CommonProps } from '@/types/common';
import { Button } from '@/ui/Button';
import { TextField } from '../../TextField';
import { validatingScheme } from './validator';
import { Select } from '@/ui/Select';

import styles from './UpdateTaskForm.module.css';

export interface UpdateTaskFormValues {
	readonly content: string;
	readonly groupId: number;
	readonly status: TaskStatus;
}

const prepareTask = (task: Task | null): UpdateTaskFormValues => {
	return task
		? {
				content: task.content,
				groupId: task.groupId,
				status: task.status,
		  }
		: {
				content: '',
				groupId: 0,
				status: 'ready',
		  };
};

export const UpdateTaskForm: React.FC<CommonProps> = ({ className }) => {
	const taskId = useGetParam(GET_PARAMS.taskId);
	const { id: roomId } = useParams();
	const { data: task } = useImminentlyQuery(
		getTaskQuery,
		{
			id: Number(taskId),
			roomId: Number(roomId),
		},
		roomId,
		taskId
	);
	const updateTask = useMutation(updateTaskMutation);
	const { data: groups } = useImminentlyQuery(getGroupsQuery, Number(roomId));
	const { t } = useTranslation(['popups', 'room']);
	const { register, handleSubmit, formState } = useForm<UpdateTaskFormValues>({
		defaultValues: prepareTask(task),
		resolver: joiResolver(validatingScheme),
	});

	const onSubmit = React.useCallback<SubmitHandler<UpdateTaskFormValues>>(
		({ groupId, status, ...values }) => {
			updateTask.start({
				...values,
				id: +taskId!,
				status,
				groupId,
				roomId: task?.roomId || 0,
			});
		},
		[taskId, task?.roomId]
	);
	const { isDirty } = formState;
	return (
		<form
			className={cn(styles.form, className)}
			onSubmit={handleSubmit(onSubmit)}>
			<Select {...register('groupId')}>
				{/* TODO: Добавить загрузку */}
				{groups?.map(({ id, name }) => (
					<option value={id} key={id}>
						{name}
					</option>
				))}
			</Select>
			<Select {...register('status')}>
				{statuses.map((name) => (
					<option value={name} key={name}>
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
