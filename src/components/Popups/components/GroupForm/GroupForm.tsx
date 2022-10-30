import * as React from 'react';
import cn from 'classnames';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { CommonProps } from '@/types';
import { GroupLabel } from '@/ui/GroupLabel';
import { Field } from '@/ui/Field';
import { validatingScheme } from './validator';
import { GroupFormValues } from './types';

import styles from './GroupForm.module.css';

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
	const { t } = useTranslation('popups');
	const { control, handleSubmit, watch, formState } = useForm<GroupFormValues>({
		resolver: joiResolver(validatingScheme),
		defaultValues,
	});
	const state = watch();
	const { isDirty, isSubmitting } = formState;
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
