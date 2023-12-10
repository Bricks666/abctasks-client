import { Button } from '@mui/material';
import cn from 'classnames';
import { Form } from 'effector-forms';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { TagLabel } from '@/entities/tags';

import { usePreventDefault } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Center, Field, Show } from '@/shared/ui';

import styles from './form.module.css';
import { TagFormValues } from './model';

export interface TagFormProps extends CommonProps {
	readonly $form: Form<TagFormValues>;
	readonly buttonText: string;
	readonly buttonDisabled?: boolean;
	readonly hideButton?: boolean;
}

export const TagForm: React.FC<TagFormProps> = (props) => {
	const { className, buttonText, $form, hideButton, buttonDisabled, } = props;
	const submit = useUnit($form.submit);

	const onSubmit = usePreventDefault(submit);

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<Preview $form={$form} />
			<Name $form={$form} />
			<MainColor $form={$form} />
			<SecondaryColor $form={$form} />
			<Show show={!hideButton}>
				<Button
					className={styles.button}
					disabled={buttonDisabled}
					type='submit'>
					{buttonText}
				</Button>
			</Show>
		</form>
	);
};

interface FieldProps {
	readonly $form: Form<TagFormValues>;
}

const Preview: React.FC<FieldProps> = (props) => {
	const { $form, } = props;

	const values = useUnit($form.$values);

	return (
		<Center className={styles.preview}>
			<TagLabel {...values} />
		</Center>
	);
};

const Name: React.FC<FieldProps> = (props) => {
	const { $form, } = props;
	const { t, } = useTranslation('room-tags');

	const label = t('actions.tag_form.fields.name');

	const name = useUnit($form.fields.name);

	return (
		<Field
			className={styles.input}
			value={name.value}
			onChange={name.onChange}
			onBlur={name.onBlur}
			helperText={name.errorText}
			isValid={name.isValid}
			name='name'
			label={label}
		/>
	);
};

const MainColor: React.FC<FieldProps> = (props) => {
	const { $form, } = props;
	const { t, } = useTranslation('room-tags');
	const label = t('actions.tag_form.fields.main_color');

	const mainColor = useUnit($form.fields.mainColor);

	return (
		<Field
			value={mainColor.value}
			onChange={mainColor.onChange}
			onBlur={mainColor.onBlur}
			helperText={mainColor.errorText}
			isValid={mainColor.isValid}
			name='mainColor'
			label={label}
			type='color'
		/>
	);
};

const SecondaryColor: React.FC<FieldProps> = (props) => {
	const { $form, } = props;
	const { t, } = useTranslation('room-tags');
	const label = t('actions.tag_form.fields.second_color');

	const secondColor = useUnit($form.fields.secondColor);

	return (
		<Field
			value={secondColor.value}
			onChange={secondColor.onChange}
			onBlur={secondColor.onBlur}
			helperText={secondColor.errorText}
			isValid={secondColor.isValid}
			name='secondColor'
			label={label}
			type='color'
		/>
	);
};
