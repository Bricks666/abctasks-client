import React, { FC, useCallback, useEffect } from "react";
import Joi from "joi";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { LoginRequest } from "../../interfaces/requests";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { login } from "../../models/User";
import { Location, useNavigate } from "react-router-dom";
import { useLocationState } from "../../hooks";
import { ClassNameComponent } from "../../interfaces/common";
import { Checkbox } from "../../ui/Checkbox";

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

export const LoginForm: FC<ClassNameComponent> = ({ className }) => {
	const { register, handleSubmit, formState, setFocus } = useForm<LoginRequest>(
		{
			defaultValues: initialValue,
			resolver: joiResolver(validationSchema),
		}
	);

	useEffect(() => {
		setFocus("login");
	}, [setFocus]);

	const navigate = useNavigate();
	const state = useLocationState<Location>();

	const { isDirty, isSubmitting } = formState;

	const onSubmit = useCallback<SubmitHandler<LoginRequest>>(
		async (values) => {
			try {
				debugger;
				await login(values);
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
			<Input {...register("login", { required: true, disabled: isSubmitting })}>
				Login
			</Input>
			<Input
				{...register("password", { required: true, disabled: isSubmitting })}
				type="password"
			>
				Password
			</Input>
			<Checkbox
				{...register("remember", { required: true, disabled: isSubmitting })}
			>
				Remember me
			</Checkbox>
			<Button disabled={!isDirty || isSubmitting} buttonType="submit">
				login
			</Button>
		</form>
	);
};
