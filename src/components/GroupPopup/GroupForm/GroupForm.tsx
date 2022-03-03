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

interface GroupFormProps extends ClassNameProps {
	readonly defaultState?: CreateEditGroupRequest | null;
	readonly afterSubmit?: VoidFunction;
	readonly submitHandler: (values: CreateEditGroupRequest) => unknown;
}

export const GroupForm: FC<GroupFormProps> = ({
	afterSubmit,
	submitHandler,
	className,
	defaultState,
}) => {
	const { control, handleSubmit, watch } = useForm<CreateEditGroupRequest>({
		defaultValues: defaultState || {},
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
			<Stack>
				<TextField
					className={GroupFormStyle.input}
					name="name"
					control={control}
					type="text"
				/>
				<Stack direction="row">
					<TextField
						className={GroupFormStyle.color}
						name="mainColor"
						control={control}
						type="color"
					/>
					<TextField
						className={GroupFormStyle.color}
						name="secondColor"
						control={control}
						type="color"
					/>
				</Stack>
			</Stack>
			<div>{state.name && <Group {...state} />}</div>

			<Button>{defaultState ? "Save group" : "Add group"}</Button>
		</form>
	);
};
