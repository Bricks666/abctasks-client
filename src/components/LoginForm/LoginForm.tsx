import React, { FC, useCallback } from "react";
import Joi from "joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { LoginRequest } from "../../interfaces/requests";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { loginFx } from "../../models/User";
import { Location, useNavigate } from "react-router-dom";
import { useLocationState } from "../../hooks";
import { createPath } from "../../utils";

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

export const LoginForm: FC = () => {
	const { register, handleSubmit, formState } = useForm<LoginRequest>({
		defaultValues: initialValue,
		resolver: joiResolver(validationSchema),
	});

	const navigate = useNavigate();
	const state = useLocationState<Location>();

	const { isDirty, isSubmitting } = formState;

	const onSubmit = useCallback<SubmitHandler<LoginRequest>>(
		async (values) => {
			try {
				await loginFx(values);
				const to = (state && createPath(state)) || "/";

				navigate(to, { replace: true });
			} catch (e) {
				console.log(e);
			}
		},
		[navigate, state]
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				{...register("login", { required: true, disabled: isSubmitting })}
			/>
			<Input
				{...register("password", { required: true, disabled: isSubmitting })}
			/>
			<Input
				{...register("remember", { required: true, disabled: isSubmitting })}
			/>
			<Button disabled={!isDirty || isSubmitting}>login</Button>
		</form>
	);
};
