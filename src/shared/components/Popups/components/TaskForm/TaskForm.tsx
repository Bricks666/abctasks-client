import { useQuery } from '@farfetched/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button, MenuItem, Skeleton } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Field, GroupLabel } from '@/shared/ui';
import styles from './TaskForm.module.css';
import { TaskFormValues } from './types';
import { validationScheme } from './validator';
import { getGroupsQuery, statuses } from '@/models';
import { CommonProps } from '@/types';

export interface TaskFormProps extends CommonProps {
	readonly defaultValues: TaskFormValues;
	readonly buttonText: string;
	readonly onSubmit: SubmitHandler<TaskFormValues>;
}

export const TaskForm: React.FC<TaskFormProps> = React.memo((props) => {
	const { buttonText, defaultValues, onSubmit, className, } = props;
	const { data: groups, } = useQuery(getGroupsQuery);
	const { t, } = useTranslation('popups');
	const { handleSubmit, formState, control, } = useForm<TaskFormValues>({
		resolver: joiResolver(validationScheme),
		defaultValues,
	});
	const groupsLoading = !groups;

	const { isDirty, isSubmitting, } = formState;
	const disableButton = !isDirty || isSubmitting;

	return (
		<form
			className={cn(styles.form, className)}
			onSubmit={handleSubmit(onSubmit)}>
			{groupsLoading ? (
				<Skeleton height='3em' />
			) : (
				<Field name='groupId' control={control} label={t(`task.group`)} select>
					{groups?.map((group) => (
						<MenuItem value={group.id} key={group.id}>
							<GroupLabel {...group} />
						</MenuItem>
					))}
				</Field>
			)}
			<Field name='status' control={control} label={t(`task.status`)} select>
				{statuses.map((name) => (
					<MenuItem value={name} key={name}>
						{t(`statuses.${name}`, { ns: 'task', })}
					</MenuItem>
				))}
			</Field>
			<Field
				className={styles.field}
				name='content'
				control={control}
				label={t('task.content')}
				multiline
				disabled={isSubmitting}
			/>
			<Button className={styles.button} type='submit' disabled={disableButton}>
				{buttonText}
			</Button>
		</form>
	);
});
