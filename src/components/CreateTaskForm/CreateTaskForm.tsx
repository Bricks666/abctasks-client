import * as React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { joiResolver } from '@hookform/resolvers/joi';
import { GET_PARAMS } from '@/const';
import { useGetParam, useTaskGroups } from '@/hooks';
import { CommonProps } from '@/interfaces/common';
import { createTask } from '@/models/Tasks';
import { TaskStatus } from '@/models/Tasks/types';
import { Button } from '@/ui/Button';
import { TextField } from '../TextField';
import { validationScheme } from './validator';
import { Select } from '@/ui/Select';

import styles from './CreateTaskForm.module.css';

export interface TaskFormValues {
	readonly content: string;
	readonly groupId: number;
}

export const CreateTaskForm: React.FC<React.PropsWithChildren<CommonProps>> = ({
	className,
}) => {
	const status =
		useGetParam<TaskStatus>(GET_PARAMS.taskStatus) || TaskStatus.READY;
	const { id: roomId } = useParams();
	const groups = useTaskGroups();
	const { t } = useTranslation('popups');

	const { handleSubmit, formState, register, reset } = useForm<TaskFormValues>({
		defaultValues: { content: '', groupId: -1 },
		resolver: joiResolver(validationScheme),
	});

	const onSubmit = React.useCallback<SubmitHandler<TaskFormValues>>(
		(values) => {
			createTask({
				...values,
				status,
				roomId: roomId!,
			});
			reset();
		},
		[status, reset, roomId]
	);

	const { isDirty, isSubmitting, errors } = formState;
	const disableButton = !isDirty || isSubmitting;

	return (
		<form
			className={cn(styles.form, className)}
			onSubmit={handleSubmit(onSubmit)}>
			<Select {...register('groupId', { disabled: isSubmitting })}>
				<option value={-1}>None</option>
				{groups.map(({ id, name }) => (
					<option value={id} key={id}>
						{name}
					</option>
				))}
			</Select>
			<TextField
				className={styles.textarea}
				{...register('content', { disabled: isSubmitting })}
				label={t('add_task.content')}
				multiline
				error={errors.content?.message}
			/>
			<Button className={styles.button} disabled={disableButton}>
				{t('add_task.button')}
			</Button>
		</form>
	);
};
