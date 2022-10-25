import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { joiResolver } from '@hookform/resolvers/joi';
import { CommonProps } from '@/types';
import { TextField } from '../TextField';
import { Button } from '@/ui/Button';
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
	const { register, formState, handleSubmit } = useForm({
		resolver: joiResolver(validatingScheme),
		defaultValues,
	});
	const { errors, isDirty, isSubmitting } = formState;
	const { description, name } = errors;
	const disabled = !isDirty || isSubmitting;

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<TextField
				{...register('name')}
				error={name?.message}
				label={t('room.name')}
			/>
			<TextField
				{...register('description')}
				error={description?.message}
				label={t('room.description')}
			/>
			<Button disabled={disabled}>{buttonText}</Button>
		</form>
	);
};
