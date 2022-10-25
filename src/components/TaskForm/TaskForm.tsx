import * as React from 'react';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@farfetched/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { getGroupsQuery } from '@/models/groups';
import { statuses } from '@/models/tasks';
import { CommonProps } from '@/types';
import { Button } from '@/ui/Button';
import { Select } from '@/ui/Select';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { validationScheme } from './validator';
import { TextField } from '../TextField';
import { TaskFormValues } from './types';

import styles from './TaskForm.module.css';

export interface TaskFormProps extends CommonProps {
	readonly defaultValues: TaskFormValues;
	readonly buttonText: string;
	readonly onSubmit: SubmitHandler<TaskFormValues>;
}

export const TaskForm: React.FC<TaskFormProps> = React.memo((props) => {
	const { buttonText, defaultValues, onSubmit, className } = props;
	const { data: groups } = useQuery(getGroupsQuery);
	const { t } = useTranslation('popups');
	const { handleSubmit, formState, register } = useForm<TaskFormValues>({
		resolver: joiResolver(validationScheme),
		defaultValues,
	});
	const groupsLoading = !groups;

	const { isDirty, isSubmitting, errors } = formState;
	const disableButton = !isDirty || isSubmitting;

	return (
		<form
			className={cn(styles.form, className)}
			onSubmit={handleSubmit(onSubmit)}>
			<div>
				{groupsLoading ? (
					<LoadingIndicator size='small' />
				) : (
					<Select {...register('groupId')}>
						{/* TODO: Добавить загрузку */}
						<option value={-1}>{t('none')}</option>
						{groups?.map(({ id, name }) => (
							<option value={id} key={id}>
								{name}
							</option>
						))}
					</Select>
				)}
			</div>

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
