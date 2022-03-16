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

import GroupFormStyle from "./GroupForm.module.css";

interface GroupFormProps extends ClassNameProps {
	readonly defaultState?: CreateEditGroupRequest | null;
	readonly afterSubmit?: VoidFunction;
	readonly submitHandler: (values: CreateEditGroupRequest) => unknown;
	readonly buttonText: string;
}

export const GroupForm: FC<GroupFormProps> = ({
	afterSubmit,
	submitHandler,
	className,
	defaultState,
	buttonText,
}) => {
	const { register, handleSubmit, watch } = useForm<CreateEditGroupRequest>({
		defaultValues: defaultState || {},
		resolver: joiResolver(validatingScheme),
	});

	const state = watch();

	const onSubmit = (values: CreateEditGroupRequest) => {
		submitHandler(values);
		afterSubmit && afterSubmit();
	};
	return (
		<form
			className={classNames(GroupFormStyle.block, className)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Stack className={GroupFormStyle.fields}>
				<TextField
					className={GroupFormStyle.input}
					{...register("name")}
					label="Group name"
				/>
				<TextField
					className={GroupFormStyle.color}
					{...register("mainColor")}
					inputClassName={GroupFormStyle.color_input}
					label="Main color"
				/>
				<TextField
					className={GroupFormStyle.color}
					{...register("secondColor")}
					inputClassName={GroupFormStyle.color_input}
					label="Second color"
				/>
			</Stack>
			{state.name && <Group {...state} />}

			<Button className={GroupFormStyle.button}>{buttonText}</Button>
		</form>
	);
};
