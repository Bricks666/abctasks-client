import React, { FC } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/TextField";
import { Button } from "@/ui/Button";
import { CreateEditGroupRequest } from "@/interfaces/requests";
import { Group } from "@/ui/Group";
import { ClassNameProps } from "@/interfaces/common";
import { Stack } from "@/ui/Stack";

import GroupFormStyle from "./GroupForm.module.css";
import { joiResolver } from "@hookform/resolvers/joi";
import { validatingScheme } from "./validator";

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
	const { control, handleSubmit, watch } = useForm<CreateEditGroupRequest>({
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
					name="name"
					control={control}
					type="text"
					label="Group name"
				/>
				<TextField
					className={GroupFormStyle.color}
					name="mainColor"
					control={control}
					type="color"
					label="Main color"
					inputClassName={GroupFormStyle.color_input}
				/>
				<TextField
					className={GroupFormStyle.color}
					name="secondColor"
					control={control}
					type="color"
					label="Second color"
					inputClassName={GroupFormStyle.color_input}
				/>
			</Stack>
			<div>{state.name && <Group {...state} />}</div>

			<Button>{buttonText}</Button>
		</form>
	);
};
