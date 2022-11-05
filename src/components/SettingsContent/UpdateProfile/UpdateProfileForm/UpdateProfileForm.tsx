import * as React from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';
import { $AuthUser } from '@/models/auth';
import { useImageURL } from '@/hooks';
import { Field } from '@/ui/Field';

import styles from './UpdateProfileForm.module.css';

export const UpdateProfileForm: React.FC = () => {
	const userInfo = useUnit($AuthUser)!;
	const { watch, handleSubmit, formState, control } = useForm<any>({
		defaultValues: userInfo,
	});

	const photo = watch('photo');
	const showedPhoto = useImageURL(photo);
	const onSubmit = (values: any) => {
		console.log(values);
	};
	const { isDirty, isSubmitting } = formState;
	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<img
				className={styles.picture}
				alt={userInfo.login}
				src={showedPhoto || ''}
			/>
			<Field name='photo' control={control} type='file' />
			<Field
				name='login'
				control={control}
				className={styles.input}
				label='Login'
			/>
			<Button className={styles.button} disabled={!isDirty || isSubmitting}>
				Save
			</Button>
		</form>
	);
};
