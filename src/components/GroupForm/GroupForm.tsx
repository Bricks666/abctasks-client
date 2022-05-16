import React, { FC } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { Field } from "@/components/Field";
import { CreateEditGroupRequest } from "@/interfaces/requests";
import { Group } from "@/ui/Group";
import { ClassNameProps, ID } from "@/interfaces/common";
import { joiResolver } from "@hookform/resolvers/joi";
import { validatingScheme } from "./validator";
import { useTranslation } from "react-i18next";

import GroupFormStyle from "./GroupForm.module.css";
import { Button, Stack } from "@mui/material";

interface GroupFormProps extends ClassNameProps {
	readonly defaultState?: CreateEditGroupRequest | null;
	readonly afterSubmit?: VoidFunction;
	readonly submitHandler: (values: CreateEditGroupRequest) => unknown;
	readonly buttonText: string;
}

const createInitialState = (roomId: ID): CreateEditGroupRequest => {
	return {
		id: 0,
		mainColor: "#000",
		secondColor: "#fff",
		name: "",
		roomId: roomId,
	};
};

export const GroupForm: FC<GroupFormProps> = ({
	afterSubmit,
	submitHandler,
	className,
	defaultState,
	buttonText,
}) => {
	const { id: roomId } = useParams();
	const { register, handleSubmit, watch, formState } =
		useForm<CreateEditGroupRequest>({
			defaultValues: defaultState || createInitialState(roomId!),
			resolver: joiResolver(validatingScheme),
		});
	const state = watch();
	const onSubmit = (values: CreateEditGroupRequest) => {
		submitHandler(values);
		afterSubmit && afterSubmit();
	};
	const { t } = useTranslation("popups");
	const { isDirty, isSubmitting, errors } = formState;
	return (
		<Stack
			className={classNames(GroupFormStyle.block, className)}
			onSubmit={handleSubmit(onSubmit)}
			component="form"
			spacing={2}
		>
			<Stack className={GroupFormStyle.fields}>
				<Field
					className={GroupFormStyle.input}
					{...register("name")}
					label={t("group_form.name")}
					error={!!errors.name?.message}
					helperText={errors.name?.message}
				/>
				<Field
					className={GroupFormStyle.color}
					{...register("mainColor")}
					label={t("group_form.main_color")}
					type="color"
					error={!!errors.mainColor?.message}
					helperText={errors.mainColor?.message}
				/>
				<Field
					className={GroupFormStyle.color}
					{...register("secondColor")}
					label={t("group_form.secondary_color")}
					type="color"
					error={!!errors.secondColor?.message}
					helperText={errors.secondColor?.message}
				/>
			</Stack>
			{state.name && <Group {...state} />}

			<Button
				className={GroupFormStyle.button}
				disabled={!isDirty || isSubmitting}
				type="submit"
			>
				{buttonText}
			</Button>
		</Stack>
	);
};
