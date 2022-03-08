import classNames from "classnames";
import React, { FC, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GET_PARAMS } from "@/const";
import { useGetParam, useGroupSelector } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { createTask } from "@/models/Tasks";
import { TaskStatus } from "@/models/Tasks/types";
import { Button } from "@/ui/Button";
import { Select, SelectValues } from "@/ui/Select";
import { TextField } from "../TextField";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationScheme } from "./validator";

import TaskFormStyle from "./CreateTaskForm.module.css";

export interface TaskFormValues {
	readonly content: string;
	readonly group: SelectValues<number>;
}

export const CreateTaskForm: FC<ClassNameProps> = ({ className }) => {
	const status = useGetParam<TaskStatus>(GET_PARAMS.taskStatus) || "Ready";

	const { groupsOptions, styles } = useGroupSelector();

	const { handleSubmit, formState, control, reset } = useForm<TaskFormValues>({
		defaultValues: { content: "", group: {} },
		resolver: joiResolver(validationScheme),
	});

	const onSubmit = useCallback<SubmitHandler<TaskFormValues>>(
		({ content, group }) => {
			createTask({
				content: content,
				groupId: group.value,
				status,
			});
			reset();
		},
		[status, reset]
	);

	const { isDirty, isSubmitting } = formState;
	const disableButton = !isDirty || isSubmitting;

	return (
		<form
			className={classNames(TaskFormStyle.form, className)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Select<TaskFormValues>
				options={groupsOptions}
				styles={styles}
				control={control}
				name="group"
			>
				Group
			</Select>
			<TextField
				className={TaskFormStyle.textarea}
				name="content"
				control={control}
				disabled={isSubmitting}
				label="Task"
				multiline
			/>
			<Button className={TaskFormStyle.button} disabled={disableButton}>
				Add Task
			</Button>
		</form>
	);
};
