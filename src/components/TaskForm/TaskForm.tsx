import * as React from 'react';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { joiResolver } from '@hookform/resolvers/joi';
import { statuses } from '@/models/tasks';
import { CommonProps } from '@/types/common';
import { Button } from '@/ui/Button';
import { Select } from '@/ui/Select';
import { validationScheme } from './validator';
import { TextField } from '../TextField';
import { TaskFormValues } from './types';
import { GroupSelect } from '../GroupSelect';

import styles from './TaskForm.module.css';

export interface TaskFormProps extends CommonProps {
	readonly defaultValues: TaskFormValues;
	readonly buttonText: string;
	readonly onSubmit: SubmitHandler<TaskFormValues>;
	readonly roomId: number;
}

export const TaskForm: React.FC<TaskFormProps> = React.memo((props) => {
	const { buttonText, defaultValues, onSubmit, roomId, className } = props;
	const { t } = useTranslation('popups');
	const { handleSubmit, formState, register } = useForm<TaskFormValues>({
		resolver: joiResolver(validationScheme),
		defaultValues,
	});

	const { isDirty, isSubmitting, errors } = formState;
	const disableButton = !isDirty || isSubmitting;

	return (
		<form
			className={cn(styles.form, className)}
			onSubmit={handleSubmit(onSubmit)}>
			<GroupSelect
				roomId={roomId}
				disabled={isSubmitting}
				{...register('groupId')}
			/>
			<Select {...register('status')}>
				{statuses.map((name) => (
					<option value={name} key={name}>
						{t(`statuses.${name}`, { ns: 'task' })}
					</option>
				))}
			</Select>
			<TextField
				className={styles.textarea}
				{...register('content')}
				label={t('task.content')}
				multiline
				error={errors.content?.message}
				disabled={isSubmitting}
			/>
			<Button className={styles.button} disabled={disableButton}>
				{buttonText}
			</Button>
		</form>
	);
});
