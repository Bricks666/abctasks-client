import React, { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { joiResolver } from "@hookform/resolvers/joi";
import { useTranslation } from "react-i18next";
import { ClassNameProps } from "@/interfaces/common";
import { RegistrationRequest } from "@/interfaces/requests";
import { clearRegistrationError, registrationFx } from "@/models/Auth";
import { Location, useNavigate } from "react-router-dom";
import { useLocationState } from "@/hooks";
import { Button } from "@/ui/Button";
import { TextField } from "../TextField";
import { validationSchema } from "./validator";
import { useRegistrationError } from "./hooks";
import { Alert } from "@/ui/Alert";
import { AlertTitle } from "@/ui/AlertTitle";

import RegistrationFormStyle from "./RegistrationForm.module.css";

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
		<form
			className={classNames(RegistrationFormStyle.form, className)}
			onSubmit={handleSubmit(onSubmit)}
		>
			{error && (
				<Alert
					type="outline"
					color="error"
					onClose={() => clearRegistrationError()}
				>
					<AlertTitle>Registration error</AlertTitle>
					This user already registered
				</Alert>
			)}
			<TextField
				{...register("login")}
				label={t("fields.login")}
				disabled={isSubmitting}
				error={errors.login?.message}
			/>
			<TextField
				{...register("password")}
				label={t("fields.password")}
				type="password"
				disabled={isSubmitting}
				error={errors.password?.message}
			/>
			<TextField
				{...register("repeatPassword")}
				label={t("fields.passwordRepeat")}
				type="password"
				disabled={isSubmitting}
				error={errors.repeatPassword?.message}
			/>
			<Button
				className={RegistrationFormStyle.button}
				disabled={!isDirty || isSubmitting}
			>
				{t("buttons.submit")}
			</Button>
		</form>
	);
};
