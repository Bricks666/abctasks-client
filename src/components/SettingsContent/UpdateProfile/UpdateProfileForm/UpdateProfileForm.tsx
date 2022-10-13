import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from 'effector-react';
import { $AuthUser } from '@/models/auth';
import { TextField } from '@/components/TextField';
import { useImageURL } from '@/hooks';
import { Button } from '@/ui/Button';
import { Picture } from '@/ui/Picture';

import styles from './UpdateProfileForm.module.css';

export const UpdateProfileForm: React.FC = () => {
	const userInfo = useStore($AuthUser)!;
	const { watch, handleSubmit, register, formState } = useForm<any>({
		defaultValues: userInfo,
	});

	const photo = watch('photo');
	const showedPhoto = useImageURL(photo);
	const onSubmit = (values: any) => {
		console.log(values);
	};
	const { errors, isDirty, isSubmitting } = formState;
	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Picture
				className={styles.picture}
				alt={userInfo.login}
				src={showedPhoto || ''}
			/>
			<TextField
				inputClassName='visibility-hidden'
				{...register('photo')}
				type='file'
				accept='image/*'
				error={errors.photo?.message?.toString()}
			/>
			<TextField
				className={styles.input}
				{...register('login')}
				label='Login'
				error={errors.login?.message?.toString()}
			/>
			<Button className={styles.button} disabled={!isDirty || isSubmitting}>
				Save
			</Button>
		</form>
	);
};
