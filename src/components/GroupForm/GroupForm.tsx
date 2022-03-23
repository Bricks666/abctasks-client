import React, { FC } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/TextField";
import { Button } from "@/ui/Button";
import { CreateEditGroupRequest } from "@/interfaces/requests";
import { Group } from "@/ui/Group";
import { ClassNameProps } from "@/interfaces/common";
import { Stack } from "@/ui/Stack";
import { joiResolver } from "@hookform/resolvers/joi";
import { validatingScheme } from "./validator";
import { useTranslation } from "react-i18next";

import GroupFormStyle from "./GroupForm.module.css";

interface GroupFormProps extends ClassNameProps {
	readonly defaultState?: CreateEditGroupRequest | null;
	readonly afterSubmit?: VoidFunction;
	readonly submitHandler: (values: CreateEditGroupRequest) => unknown;
	readonly buttonText: string;
}

const initialState: CreateEditGroupRequest = {
	id: 0,
	mainColor: "#000",
	secondColor: "#fff",
	name: "",
};

export const GroupForm: FC<GroupFormProps> = ({
	afterSubmit,
	submitHandler,
	className,
	defaultState,
	buttonText,
}) => {
	const { register, handleSubmit, watch, formState } =
		useForm<CreateEditGroupRequest>({
			defaultValues: defaultState || initialState,
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
		<form
			className={classNames(GroupFormStyle.block, className)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Stack className={GroupFormStyle.fields}>
				<TextField
					className={GroupFormStyle.input}
					{...register("name")}
					label={t("group_form.name")}
					error={errors.name?.message}
				/>
				<TextField
					className={GroupFormStyle.color}
					{...register("mainColor")}
					inputClassName={GroupFormStyle.color_input}
					label={t("group_form.main_color")}
					type="color"
					error={errors.mainColor?.message}
				/>
				<TextField
					className={GroupFormStyle.color}
					{...register("secondColor")}
					inputClassName={GroupFormStyle.color_input}
					label={t("group_form.secondary_color")}
					type="color"
					error={errors.secondColor?.message}
				/>
			</Stack>
			{state.name && <Group {...state} />}

			<Button
				className={GroupFormStyle.button}
				disabled={!isDirty || isSubmitting}
			>
				{buttonText}
			</Button>
		</form>
	);
};
