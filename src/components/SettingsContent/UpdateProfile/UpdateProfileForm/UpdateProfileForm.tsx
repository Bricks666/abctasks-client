import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/TextField";
import { useUserInfo } from "@/hooks";
import { Button } from "@/ui/Button";
import { Picture } from "@/ui/Picture";

import ChangeProfileFormStyle from "./UpdateProfileForm.module.css";

interface UpdateProfileFormValues {
	readonly photo: FileList | string | null;
	readonly login: string;
}

export const UpdateProfileForm: FC = () => {
	const userInfo = useUserInfo();
	const { watch, handleSubmit, register } = useForm<UpdateProfileFormValues>({
		defaultValues: userInfo,
	});

	const photo = watch("photo");
	const showedPhoto = photo
		? typeof photo === "string"
			? photo
			: photo[0] && URL.createObjectURL(photo[0])
		: null;
	const onSubmit = (values: UpdateProfileFormValues) => {};
	return (
		<form
			className={ChangeProfileFormStyle.form}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Picture
				className={ChangeProfileFormStyle.picture}
				alt={userInfo.login}
				src={showedPhoto || ""}
			/>
			<TextField {...register("photo")} type="file" label="Photo" />
			<TextField {...register("login")} label="Login" />
			<Button>Save</Button>
		</form>
	);
};
