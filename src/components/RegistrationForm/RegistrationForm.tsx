import React, { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";
import { ClassNameProps } from "@/interfaces/common";
import { RegistrationRequest } from "@/interfaces/requests";
import { clearRegistrationError, registrationFx } from "@/models/Auth";
import { Location, useNavigate } from "react-router-dom";
import { useLocationState } from "@/hooks";
import { Field } from "../Field";
import { validationSchema } from "./validator";
import { useRegistrationError } from "./hooks";
import { Alert, AlertTitle, Button, Stack } from "@mui/material";

const initialValues: RegistrationRequest = {
	login: "",
	password: "",
	repeatPassword: "",
};

export const RegistrationForm: FC<ClassNameProps> = ({ className }) => {
	const { t } = useTranslation("registration");
	const { register, handleSubmit, formState } = useForm<RegistrationRequest>({
		defaultValues: initialValues,
		resolver: joiResolver(validationSchema),
	});
	const navigate = useNavigate();
	const state = useLocationState<Location>();
	const onSubmit = useCallback(
		async (values) => {
			await registrationFx(values);
			navigate("/login", { replace: true, state });
		},
		[navigate, state]
	);
	const { isSubmitting, isDirty, errors } = formState;
	const error = useRegistrationError();

	useEffect(() => {
		return () => {
			clearRegistrationError();
		};
	}, []);

	return (
		<Stack
			className={className}
			spacing={2}
			onSubmit={handleSubmit(onSubmit)}
			component="form"
		>
			{error && (
				<Alert
					variant="outlined"
					color="error"
					onClose={() => clearRegistrationError()}
				>
					<AlertTitle>Registration error</AlertTitle>
					This user already registered
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
			<Field
				{...register("repeatPassword")}
				label={t("fields.passwordRepeat")}
				type="password"
				disabled={isSubmitting}
				error={!!errors.repeatPassword?.message}
				helperText={errors.repeatPassword?.message}
			/>
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
