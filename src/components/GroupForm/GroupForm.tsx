import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { TextField } from '@/components/TextField';
import { Button } from '@/ui/Button';
import { Stack } from '@/ui/Stack';
import { CommonProps } from '@/types/common';
import { Group } from '@/ui/Group';
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
	const { register, handleSubmit, watch, formState } = useForm<GroupFormValues>(
		{
			resolver: joiResolver(validatingScheme),
			defaultValues,
		}
	);
	const state = watch();
	const { isDirty, isSubmitting, errors } = formState;
	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<Stack className={styles.fields}>
				<TextField
					className={styles.input}
					{...register('name')}
					label={t('group_form.name')}
					error={errors.name?.message}
				/>
				<TextField
					{...register('mainColor')}
					inputClassName={styles.color_input}
					label={t('group_form.main_color')}
					type='color'
					error={errors.mainColor?.message}
				/>
				<TextField
					{...register('secondColor')}
					inputClassName={styles.color_input}
					label={t('group_form.secondary_color')}
					type='color'
					error={errors.secondColor?.message}
				/>
			</Stack>
			{state.name && <Group {...state} />}
			<Button className={styles.button} disabled={!isDirty || isSubmitting}>
				{buttonText}
			</Button>
		</form>
	);
};
