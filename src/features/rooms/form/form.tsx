import { Button, Stack } from '@mui/material';
import cn from 'classnames';
import { Form } from 'effector-forms';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { usePreventDefault } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Field, Show } from '@/shared/ui';

import styles from './form.module.css';
import { RoomFormValues } from './model';

export interface RoomFormProps extends CommonProps {
	readonly $form: Form<RoomFormValues>;
	readonly hideButton?: boolean;
	readonly buttonText?: string;
	readonly disabled?: boolean;
}

export const RoomForm: React.FC<RoomFormProps> = (props) => {
	const { className, buttonText, $form, disabled, hideButton, } = props;
	const submit = useUnit($form.submit);

	const onSubmit = usePreventDefault(submit);

	return (
		<Stack
			className={cn(styles.form, className)}
			spacing={1}
			onSubmit={onSubmit}
			component='form'>
			<Name $form={$form} />
			<Description $form={$form} />
			<Show show={!hideButton}>
				<Button className={styles.button} disabled={disabled} type='submit'>
					{buttonText}
				</Button>
			</Show>
		</Stack>
	);
};

interface FieldProps {
	readonly $form: Form<RoomFormValues>;
}

const Name: React.FC<FieldProps> = (props) => {
	const { $form, } = props;
	const { t, } = useTranslation('popups');

	const name = useUnit($form.fields.name);

	return (
		<Field
			value={name.value}
			onChange={name.onChange}
			onBlur={name.onBlur}
			helperText={name.errorText}
			isValid={name.isValid}
			name='name'
			label={t('room.name')}
		/>
	);
};

const Description: React.FC<FieldProps> = (props) => {
	const { $form, } = props;
	const { t, } = useTranslation('popups');

	const description = useUnit($form.fields.description);

	return (
		<Field
			value={description.value}
			onChange={description.onChange}
			onBlur={description.onBlur}
			helperText={description.errorText}
			isValid={description.isValid}
			name='description'
			label={t('room.description')}
		/>
	);
};
