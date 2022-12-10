import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CommonProps } from '@/shared/types';
import { Field, GroupLabel } from '@/shared/ui';
import styles from './GroupForm.module.css';
import { GroupFormValues } from './types';
import { validatingScheme } from './validator';

export interface GroupFormProps extends CommonProps {
	readonly defaultValues: GroupFormValues;
	readonly buttonText: string;
	readonly onSubmit: SubmitHandler<GroupFormValues>;
}

export const GroupForm: React.FC<GroupFormProps> = ({
	className,
	defaultValues,
	buttonText,
	onSubmit,
}) => {
	const { t, } = useTranslation('popups');
	const { control, handleSubmit, watch, formState, } = useForm<GroupFormValues>({
		resolver: joiResolver(validatingScheme),
		defaultValues,
	});
	const state = watch();
	const { isDirty, isSubmitting, } = formState;
	return (
		<form
			className={cn(styles.form, className)}
			onSubmit={handleSubmit(onSubmit)}>
			{state.name && <GroupLabel {...state} />}
			<Field
				className={styles.input}
				name='name'
				control={control}
				label={t('group.name')}
			/>
			<Field
				name='mainColor'
				control={control}
				label={t('group.mainColor')}
				type='color'
			/>
			<Field
				name='secondColor'
				control={control}
				label={t('group.secondaryColor')}
				type='color'
			/>
			<Button
				className={styles.button}
				disabled={!isDirty || isSubmitting}
				type='submit'>
				{buttonText}
			</Button>
		</form>
	);
};
