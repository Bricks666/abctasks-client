import React, { FC, useCallback } from "react";
import { Location, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { LoginRequest } from "@/interfaces/requests";
import { Button } from "@/ui/Button";
import { clearLoginError, loginFx } from "@/models/User";
import { useLocationState } from "@/hooks";
import { TextField } from "../TextField";
import { ClassNameProps } from "@/interfaces/common";
import { Checkbox } from "../Checkbox";
import { validationSchema } from "./validator";
import { Alert } from "@/ui/Alert";
import { AlertTitle } from "@/ui/AlertTitle";
import { useLoginError } from "./hooks";

import LoginFormStyle from "./LoginForm.module.css";
import { FocusTrap } from "@/ui/FocusTrap";

const initialValue: LoginRequest = {
	login: "",
	password: "",
	remember: false,
};

export const LoginForm: FC<ClassNameProps> = ({ className }) => {
	const { control, handleSubmit, formState } = useForm<LoginRequest>({
		defaultValues: initialValue,
		resolver: joiResolver(validationSchema),
	});
	const navigate = useNavigate();
	const state = useLocationState<Location>();
	const { isDirty, isSubmitting } = formState;
	const onSubmit = useCallback<SubmitHandler<LoginRequest>>(
		async (values) => {
			await loginFx(values);
			const to = state || "/";

			navigate(to, { replace: true });
		},
		[navigate, state]
	);
	const error = useLoginError();

	return (
		<form
			className={classNames(LoginFormStyle.form, className)}
			onSubmit={handleSubmit(onSubmit)}
		>
			{error && (
				<Alert color="error" type="outline" onClose={() => clearLoginError()}>
					<AlertTitle>Authorization error</AlertTitle>
					Incorrect login or password
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
			<Checkbox name="remember" control={control} label="Remember me" />
			<Button
				className={LoginFormStyle.button}
				disabled={!isDirty || isSubmitting}
				type="filed"
			>
				login
			</Button>
		</form>
	);
};
