import React, { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { ClassNameProps } from "@/interfaces/common";
import { RegistrationRequest } from "@/interfaces/requests";
import { registration } from "@/models/User";
import { Location, useNavigate } from "react-router-dom";
import { useLocationState } from "@/hooks";
import { Button } from "@/ui/Button";
import { TextField } from "../TextField";

import RegistrationFormStyle from "./RegistrationForm.module.css";

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

export const RegistrationForm: FC<ClassNameProps> = ({ className }) => {
	const { control, handleSubmit, formState } = useForm<RegistrationRequest>({
		defaultValues: initialValues,
		resolver: joiResolver(validationSchema),
	});

	const navigate = useNavigate();
	const state = useLocationState<Location>();

	const onSubmit = useCallback(
		(values) => {
			try {
				registration(values);
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
