import * as React from 'react';
import cn from 'classnames';
import { Button, Stack } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { joiResolver } from '@hookform/resolvers/joi';
import { CommonProps } from '@/types';
import { Field } from '@/shared/components';
import { validatingScheme } from './validator';
import { RoomFormValues } from './types';

import styles from './RoomForm.module.css';

export interface RoomFormProps extends CommonProps {
	readonly onSubmit: SubmitHandler<RoomFormValues>;
	readonly buttonText: string;
	readonly defaultValues: RoomFormValues;
}

export const RoomForm: React.FC<RoomFormProps> = ({
	onSubmit,
	className,
	defaultValues,
	buttonText,
}) => {
	const { t } = useTranslation('popups');
	const { formState, handleSubmit, control } = useForm<RoomFormValues>({
		resolver: joiResolver(validatingScheme),
		defaultValues,
	});
	const { isDirty, isSubmitting } = formState;
	const disabled = !isDirty || isSubmitting;

	return (
		<Stack
			className={cn(styles.form, className)}
			spacing={1}
			onSubmit={handleSubmit(onSubmit)}
			component='form'>
			<Field name='name' control={control} label={t('room.name')} />
			<Field
				name='description'
				control={control}
				label={t('room.description')}
			/>
			<Button className={styles.button} disabled={disabled} type='submit'>
				{buttonText}
			</Button>
		</Stack>
	);
};
