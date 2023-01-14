import { Button } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { GroupsSelect } from '@/entities/groups';
import { StatusSelect } from '@/entities/tasks';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';
import { taskFormModel } from '../../model';

import styles from './task-form.module.css';

export interface TaskFormProps extends CommonProps {
	readonly buttonText: string;
}

export const TaskForm: React.FC<TaskFormProps> = React.memo((props) => {
	const { buttonText, className, } = props;
	const { t, } = useTranslation('popups');
	const { fields, submit, isDirty, } = useForm(taskFormModel.form);

	const { content, groupId, status, } = fields;

	const onSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		submit();
	};

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<GroupsSelect
				value={groupId.value}
				onChange={groupId.onChange}
				onBlur={groupId.onBlur}
				errorText={groupId.errorText()}
				isValid={groupId.isValid}
				name={groupId.name}
				label={t(`task.group`)}
			/>
			<StatusSelect
				value={status.value}
				onChange={status.onChange}
				onBlur={status.onBlur}
				errorText={status.errorText()}
				isValid={status.isValid}
				name={status.name}
				label={t(`task.status`)}
			/>
			<Field
				className={styles.field}
				value={content.value}
				onChange={content.onChange}
				onBlur={content.onBlur}
				errorText={content.errorText()}
				isValid={content.isValid}
				name={content.name}
				label={t('task.content')}
				multiline
			/>
			<Button className={styles.button} type='submit' disabled={!isDirty}>
				{buttonText}
			</Button>
		</form>
	);
});
