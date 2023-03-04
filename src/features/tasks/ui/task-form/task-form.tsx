import { Button } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TagPicker } from '@/entities/tags';
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

	const { tagIds, title, status, } = fields;

	const onSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		submit();
	};

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<TagPicker
				value={tagIds.value}
				onChange={tagIds.onChange}
				onBlur={tagIds.onBlur}
				helperText={tagIds.errorText()}
				isValid={tagIds.isValid}
				name={tagIds.name}
				label={t(`task.group`)}
				limitTags={1}
				multiple
			/>
			<StatusSelect
				value={status.value}
				onChange={status.onChange}
				onBlur={status.onBlur}
				helperText={status.errorText()}
				isValid={status.isValid}
				name={status.name}
				label={t(`task.status`)}
			/>
			<Field
				className={styles.field}
				value={title.value}
				onChange={title.onChange}
				onBlur={title.onBlur}
				helperText={title.errorText()}
				isValid={title.isValid}
				name={title.name}
				label={t('task.content')}
				multiline
			/>
			<Button className={styles.button} type='submit' disabled={!isDirty}>
				{buttonText}
			</Button>
		</form>
	);
});
