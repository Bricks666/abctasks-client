import { Button, Stack } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';
import { roomFormModel } from '../../model';

import styles from './room-form.module.css';

export interface RoomFormProps extends CommonProps {
	readonly buttonText: string;
}

export const RoomForm: React.FC<RoomFormProps> = (props) => {
	const { className, buttonText, } = props;
	const { t, } = useTranslation('popups');
	const { submit, fields, isDirty, } = useForm(roomFormModel.form);

	const { description, name, } = fields;

	const onSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		submit();
	};

	return (
		<Stack
			className={cn(styles.form, className)}
			spacing={1}
			onSubmit={onSubmit}
			component='form'>
			<Field
				value={name.value}
				onChange={name.onChange}
				onBlur={name.onBlur}
				errorText={name.errorText()}
				isValid={name.isValid}
				name={name.name}
				label={t('room.name')}
			/>
			<Field
				value={description.value}
				onChange={description.onChange}
				onBlur={description.onBlur}
				errorText={description.errorText()}
				isValid={description.isValid}
				name={description.name}
				label={t('room.description')}
			/>
			<Button className={styles.button} disabled={!isDirty} type='submit'>
				{buttonText}
			</Button>
		</Stack>
	);
};
