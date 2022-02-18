import React, { FC, useCallback } from "react";
import Joi from "joi";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { LoginRequest } from "@/interfaces/requests";
import { Button } from "@/ui/Button";
import { login } from "@/models/User";
import { Location, useNavigate } from "react-router-dom";
import { useLocationState } from "@/hooks";
import { TextField } from "../TextField";
import { ClassNameProps } from "@/interfaces/common";
import { Checkbox } from "../Checkbox";

import LoginFormStyle from "./LoginForm.module.css";

const initialValue: LoginRequest = {
	login: "",
	password: "",
	remember: false,
};

const validationSchema = Joi.object<LoginRequest>({
	login: Joi.string().required(),
	password: Joi.string().required(),
	remember: Joi.boolean(),
});

export const LoginForm: FC<ClassNameProps> = ({ className }) => {
	const { control, handleSubmit, formState } =
		useForm<LoginRequest>({
			defaultValues: initialValue,
			resolver: joiResolver(validationSchema),
		});


	const navigate = useNavigate();
	const state = useLocationState<Location>();

	const { isDirty, isSubmitting } = formState;

	const onSubmit = useCallback<SubmitHandler<LoginRequest>>(
		(values) => {
			try {
				login(values);
				const to = state || "/";

				navigate(to, { replace: true });
			} catch (e) {
				console.log(e);
			}
		},
		[navigate, state]
	);

	return (
		<form
			className={classNames(LoginFormStyle.form, className)}
			onSubmit={handleSubmit(onSubmit)}
		>
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
