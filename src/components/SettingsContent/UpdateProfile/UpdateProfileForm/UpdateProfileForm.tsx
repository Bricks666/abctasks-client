import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { Field } from "@/components/Field";
import { useImageURL, useUserInfo } from "@/hooks";
import { Button } from "@/ui/Button";
import { Picture } from "@/ui/Picture";
import { updateProfile } from "@/models/User";
import { UpdateProfileRequest } from "@/interfaces/requests";

import UpdateProfileFormStyle from "./UpdateProfileForm.module.css";

export const UpdateProfileForm: FC = () => {
	const userInfo = useUserInfo();
	const { watch, handleSubmit, register, formState } =
		useForm<UpdateProfileRequest>({
			defaultValues: userInfo,
		});

	const photo = watch("photo");
	const showedPhoto = useImageURL(photo);
	const onSubmit = (values: UpdateProfileRequest) => {
		updateProfile(values);
	};
	const { errors, isDirty, isSubmitting } = formState;
	return (
		<form
			className={UpdateProfileFormStyle.form}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Picture
				className={UpdateProfileFormStyle.picture}
				alt={userInfo.login}
				src={showedPhoto || ""}
			/>
			<Field
				{...register("photo")}
				type="file"
				accept="image/*"
				error={!!errors.photo?.message}
				helperText={errors.photo?.message}
			/>
			<Field
				className={UpdateProfileFormStyle.input}
				{...register("login")}
				label="Login"
				error={!!errors.login?.message}
				helperText={errors.login?.message}
			/>
			<Button
				className={UpdateProfileFormStyle.button}
				disabled={!isDirty || isSubmitting}
			>
				Save
			</Button>
		</form>
	);
};
