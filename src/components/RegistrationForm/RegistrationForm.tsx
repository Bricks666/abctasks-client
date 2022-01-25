import React, { FC, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { ClassNameComponent } from "../../interfaces/common";
import { RegistrationRequest } from "../../interfaces/requests";
import { Input } from "../../ui/Input";
import { registrationFx } from "../../models/User";
import { Location, useNavigate } from "react-router-dom";
import { useLocationState } from "../../hooks";
import { Button } from "../../ui/Button";

import RegistrationFormStyle from "./RegistrationForm.module.css";
import classNames from "classnames";

const initialValues: RegistrationRequest = {
	login: "",
	password: "",
	repeatPassword: "",
};

const validationSchema = Joi.object<RegistrationRequest>({
	login: Joi.string().required(),
	password: Joi.string().required(),
	repeatPassword: Joi.string().valid(Joi.ref("password")),
});

export const RegistrationForm: FC<ClassNameComponent> = ({ className }) => {
	const { register, handleSubmit, formState } = useForm<RegistrationRequest>({
		defaultValues: initialValues,
		resolver: joiResolver(validationSchema),
	});

	const navigate = useNavigate();
	const state = useLocationState<Location>();

	const onSubmit = useCallback<SubmitHandler<RegistrationRequest>>(
		async (values) => {
			try {
				await registrationFx(values);
				navigate("/login", { replace: true, state });
			} catch (e) {
				console.log(e);
			}
		},
		[navigate, state]
	);

	const { isSubmitting, isDirty } = formState;

	return (
		<form
			className={classNames(RegistrationFormStyle.form, className)}
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
			<Input
				{...register("repeatPassword", {
					required: true,
					disabled: isSubmitting,
				})}
				type="password"
			>
				Repeat password
			</Input>
			<Button disabled={!isDirty || isSubmitting}>Registration</Button>
		</form>
	);
};
