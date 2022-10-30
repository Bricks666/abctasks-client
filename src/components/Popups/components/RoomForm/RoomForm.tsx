import * as React from 'react';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { joiResolver } from '@hookform/resolvers/joi';
import { CommonProps } from '@/types';
import { Field } from '@/ui/Field';
import { validatingScheme } from './validator';
import { RoomFormValues } from './types';

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
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<Field name='name' control={control} label={t('room.name')} />
			<Field
				name='description'
				control={control}
				label={t('room.description')}
			/>
			<Button disabled={disabled} type='submit'>
				{buttonText}
			</Button>
		</form>
	);
};
