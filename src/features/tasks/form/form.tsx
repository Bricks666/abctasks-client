import { Button } from '@mui/material';
import cn from 'classnames';
import { Form } from 'effector-forms';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { TagPicker } from '@/entities/tags';
import { StatusSelect } from '@/entities/tasks';

import { usePreventDefault } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';

import styles from './form.module.css';
import { TaskFormValues } from './lib';

export interface TaskFormProps extends CommonProps {
	readonly buttonText: string;
	readonly $form: Form<TaskFormValues>;
	readonly buttonDisabled?: boolean;
	readonly hideButton?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = React.memo((props) => {
	const { buttonText, className, $form, hideButton, buttonDisabled, } = props;
	const submit = useUnit($form.submit);

	const onSubmit = usePreventDefault(submit);

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<Title $form={$form} />
			<Tags $form={$form} />
			<Status $form={$form} />
			<Description $form={$form} />
			{hideButton ? null : (
				<Button
					className={styles.button}
					type='submit'
					disabled={buttonDisabled}>
					{buttonText}
				</Button>
			)}
		</form>
	);
});

interface FieldProps {
	readonly $form: Form<TaskFormValues>;
}

const Title: React.FC<FieldProps> = (props) => {
	const { $form, } = props;
	const { t, } = useTranslation('tasks');
	const label = t('actions.task_form.fields.title');

	const title = useUnit($form.fields.title);

	return (
		<Field
			className={styles.field}
			value={title.value}
			onChange={title.onChange}
			onBlur={title.onBlur}
			helperText={title.errorText}
			isValid={title.isValid}
			name='title'
			label={label}
		/>
	);
};

const Tags: React.FC<FieldProps> = (props) => {
	const { $form, } = props;

	const { t, } = useTranslation('tasks');
	const label = t('actions.task_form.fields.tags');

	const tagIds = useUnit($form.fields.tagIds);

	return (
		<TagPicker
			value={tagIds.value}
			onChange={tagIds.onChange}
			onBlur={tagIds.onBlur}
			helperText={tagIds.errorText}
			isValid={tagIds.isValid}
			name='tagIds'
			label={label}
			limitTags={1}
			multiple
		/>
	);
};

const Status: React.FC<FieldProps> = (props) => {
	const { $form, } = props;

	const { t, } = useTranslation('tasks');
	const label = t('actions.task_form.fields.status');

	const status = useUnit($form.fields.status);

	return (
		<StatusSelect
			value={status.value}
			onChange={status.onChange}
			onBlur={status.onBlur}
			helperText={status.errorText}
			isValid={status.isValid}
			name='status'
			label={label}
		/>
	);
};

const Description: React.FC<FieldProps> = (props) => {
	const { $form, } = props;

	const { t, } = useTranslation('tasks');
	const label = t('actions.task_form.fields.description');

	const description = useUnit($form.fields.description);

	return (
		<Field
			className={styles.field}
			value={description.value}
			onChange={description.onChange}
			onBlur={description.onBlur}
			helperText={description.errorText}
			isValid={description.isValid}
			name='description'
			label={label}
			minRows={5}
			multiline
		/>
	);
};
