import * as React from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '@/components/TextField';
import { useImageURL, useUserInfo } from '@/hooks';
import { Button } from '@/ui/Button';
import { Picture } from '@/ui/Picture';
import { updateProfile } from '@/models/User';
import { UpdateProfileRequest } from '@/interfaces/requests';

import styles from './UpdateProfileForm.module.css';

export const UpdateProfileForm: React.FC = () => {
	const userInfo = useUserInfo();
	const { watch, handleSubmit, register, formState } =
		useForm<UpdateProfileRequest>({
			defaultValues: userInfo,
		});

	const photo = watch('photo');
	const showedPhoto = useImageURL(photo);
	const onSubmit = (values: UpdateProfileRequest) => {
		updateProfile(values);
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
				error={errors.photo?.message}
			/>
			<TextField
				className={styles.input}
				{...register('login')}
				label='Login'
				error={errors.login?.message}
			/>
			<Button className={styles.button} disabled={!isDirty || isSubmitting}>
				Save
			</Button>
		</form>
	);
};
