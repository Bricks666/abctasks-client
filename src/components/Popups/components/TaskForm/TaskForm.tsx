import * as React from 'react';
import { Box, Button, MenuItem, Skeleton } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@farfetched/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { getGroupsQuery } from '@/models/groups';
import { statuses } from '@/models/tasks';
import { CommonProps } from '@/types';
import { Field } from '@/ui/Field';
import { validationScheme } from './validator';
import { TaskFormValues } from './types';
import { buttonSx, fieldSx, fromSx } from './styles';
import { GroupLabel } from '@/shared/components/GroupLabel';

export interface TaskFormProps extends CommonProps {
	readonly defaultValues: TaskFormValues;
	readonly buttonText: string;
	readonly onSubmit: SubmitHandler<TaskFormValues>;
}

export const TaskForm: React.FC<TaskFormProps> = React.memo((props) => {
	const { buttonText, defaultValues, onSubmit, className } = props;
	const { data: groups } = useQuery(getGroupsQuery);
	const { t } = useTranslation('popups');
	const { handleSubmit, formState, control } = useForm<TaskFormValues>({
		resolver: joiResolver(validationScheme),
		defaultValues,
	});
	const groupsLoading = !groups;

	const { isDirty, isSubmitting } = formState;
	const disableButton = !isDirty || isSubmitting;

	return (
		<Box
			className={className}
			onSubmit={handleSubmit(onSubmit)}
			component='form'
			sx={fromSx}>
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
						{t(`statuses.${name}`, { ns: 'task' })}
					</MenuItem>
				))}
			</Field>
			<Field
				name='content'
				control={control}
				label={t('task.content')}
				multiline
				disabled={isSubmitting}
				sx={fieldSx}
			/>
			<Button type='submit' disabled={disableButton} sx={buttonSx}>
				{buttonText}
			</Button>
		</Box>
	);
});
