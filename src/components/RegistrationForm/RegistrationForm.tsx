import React, { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { ClassNameProps } from "@/interfaces/common";
import { RegistrationRequest } from "@/interfaces/requests";
import { clearRegistrationError, registrationFx } from "@/models/User";
import { Location, useNavigate } from "react-router-dom";
import { useLocationState } from "@/hooks";
import { Button } from "@/ui/Button";
import { TextField } from "../TextField";
import { validationSchema } from "./validator";

import RegistrationFormStyle from "./RegistrationForm.module.css";
import { useRegistrationError } from "./hooks";
import { Alert } from "@/ui/Alert";
import { AlertTitle } from "@/ui/AlertTitle";

const initialValues: RegistrationRequest = {
	login: "",
	password: "",
	repeatPassword: "",
};

export const RegistrationForm: FC<ClassNameProps> = ({ className }) => {
	const { control, handleSubmit, formState } = useForm<RegistrationRequest>({
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
	const { isSubmitting, isDirty } = formState;
	const error = useRegistrationError();

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
				name="login"
				control={control}
				label="Login"
				disabled={isSubmitting}
			/>
			<TextField
				name="password"
				control={control}
				label="Password"
				type="password"
				disabled={isSubmitting}
			/>
			<TextField
				name="repeatPassword"
				control={control}
				label="Repeat password"
				type="password"
				disabled={isSubmitting}
			/>
			<Button
				className={RegistrationFormStyle.button}
				disabled={!isDirty || isSubmitting}
			>
				Registration
			</Button>
		</form>
	);
};
