import { Button, Stack } from '@mui/material';
import cn from 'classnames';
import { Form } from 'effector-forms';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { MIN_LENGTH, MAX_SHORT_LENGTH } from '@/shared/configs';
import { usePreventDefault } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Field, Show } from '@/shared/ui';

import styles from './form.module.css';
import { RoomFormValues } from './model';

export interface RoomFormProps extends CommonProps {
	readonly $form: Form<RoomFormValues>;
	readonly ariaLabelledby?: string;
	readonly hideButton?: boolean;
	readonly buttonText?: string;
	readonly disabled?: boolean;
}

export const RoomForm: React.FC<RoomFormProps> = (props) => {
	const { className, buttonText, $form, disabled, hideButton, ariaLabelledby, } =
		props;
	const submit = useUnit($form.submit);

	const onSubmit = usePreventDefault(submit);

	return (
		<Stack
			className={cn(styles.form, className)}
			spacing={1}
			onSubmit={onSubmit}
			aria-labelledby={ariaLabelledby}
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
	const { t, } = useTranslation('rooms');
	const name = useUnit($form.fields.name);
	const { errorText, } = name;

	const label = t('actions.room_form.fields.name');
	const error = t(
		[`actions.room_form.errors.name.${errorText}`, 'common:errors.default'],
		{
			min_symbols_count: MIN_LENGTH,
			max_symbols_count: MAX_SHORT_LENGTH,
		}
	);
	const errorHelperText = name.isValid ? null : error;

	return (
		<Field
			value={name.value}
			onChange={name.onChange}
			onBlur={name.onBlur}
			helperText={errorHelperText}
			isValid={name.isValid}
			name='name'
			label={label}
			multiline
		/>
	);
};

const Description: React.FC<FieldProps> = (props) => {
	const { $form, } = props;
	const { t, } = useTranslation('rooms');
	const description = useUnit($form.fields.description);
	const { errorText, } = description;

	const label = t('actions.room_form.fields.description');
	const error = t(
		[
			`actions.room_form.errors.description.${errorText}`,
			'common:errors.default'
		],
		{
			min_symbols_count: MIN_LENGTH,
			max_symbols_count: MAX_SHORT_LENGTH,
		}
	);
	const errorHelperText = description.isValid ? null : error;

	return (
		<Field
			value={description.value}
			onChange={description.onChange}
			onBlur={description.onBlur}
			helperText={errorHelperText}
			isValid={description.isValid}
			name='description'
			label={label}
		/>
	);
};
