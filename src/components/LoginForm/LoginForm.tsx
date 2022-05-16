import React, { FC, useCallback, useEffect } from "react";
import { Location, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";
import { LoginRequest } from "@/interfaces/requests";
import { clearLoginError, loginFx } from "@/models/Auth";
import { useLocationState } from "@/hooks";
import { Field } from "../Field";
import { ClassNameProps } from "@/interfaces/common";
import { Checkbox } from "../Checkbox";
import { validationSchema } from "./validator";
import { useLoginError } from "./hooks";
import { Alert, AlertTitle, Button, Stack } from "@mui/material";

const initialValue: LoginRequest = {
	login: "",
	password: "",
	remember: false,
};

export const LoginForm: FC<ClassNameProps> = ({ className }) => {
	const { t } = useTranslation("login");
	const { register, handleSubmit, formState } = useForm<LoginRequest>({
		defaultValues: initialValue,
		resolver: joiResolver(validationSchema),
	});
	const navigate = useNavigate();
	const state = useLocationState<Location>();
	const { isDirty, isSubmitting, errors } = formState;
	const onSubmit = useCallback<SubmitHandler<LoginRequest>>(
		async (values) => {
			await loginFx(values);
			const to = state || "/";

			navigate(to, { replace: true });
		},
		[navigate, state]
	);
	/* TODO: Make error typing */
	const error = useLoginError();
	useEffect(() => {
		return () => {
			clearLoginError();
		};
	}, []);

	return (
		<Stack
			className={className}
			onSubmit={handleSubmit(onSubmit)}
			spacing={2}
			component="form"
		>
			{error && (
				<Alert
					color="error"
					variant="outlined"
					onClose={() => clearLoginError()}
				>
					<AlertTitle>Authorization error</AlertTitle>
					Incorrect login or password
				</Alert>
			)}
			<Field
				{...register("login")}
				label={t("fields.login")}
				disabled={isSubmitting}
				error={!!errors.login?.message}
				helperText={errors.login?.message}
			/>

			<Field
				{...register("password")}
				label={t("fields.password")}
				type="password"
				disabled={isSubmitting}
				error={!!errors.password?.message}
				helperText={errors.password?.message}
			/>
			<Checkbox {...register("remember")} label={t("fields.remember")} />
			<Button
				disabled={!isDirty || isSubmitting}
				variant="contained"
				type="submit"
			>
				{t("buttons.submit")}
			</Button>
		</Stack>
	);
};
