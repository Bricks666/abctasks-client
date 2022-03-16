import classNames from "classnames";
import React, { FC, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GET_PARAMS } from "@/const";
import { useGetParam, useTaskGroups } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { createTask } from "@/models/Tasks";
import { TaskStatus } from "@/models/Tasks/types";
import { Button } from "@/ui/Button";
import { TextField } from "../TextField";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationScheme } from "./validator";

import TaskFormStyle from "./CreateTaskForm.module.css";

export interface TaskFormValues {
	readonly content: string;
	readonly groupId: number;
}

export const CreateTaskForm: FC<ClassNameProps> = ({ className }) => {
	const status = useGetParam<TaskStatus>(GET_PARAMS.taskStatus) || "Ready";
	const groups = useTaskGroups();

	const { handleSubmit, formState, register, reset } = useForm<TaskFormValues>({
		defaultValues: { content: "", groupId: 0 },
		resolver: joiResolver(validationScheme),
	});

	const onSubmit = useCallback<SubmitHandler<TaskFormValues>>(
		({ content, groupId }) => {
			createTask({
				content: content,
				groupId: groupId,
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
			<TextField
				{...register("groupId", { disabled: isSubmitting })}
				select
				label="groupId"
			>
				{groups.map(({ id, name }) => (
					<option value={id} key={id}>
						{name}
					</option>
				))}
			</TextField>
			<TextField
				className={TaskFormStyle.textarea}
				{...register("content", { disabled: isSubmitting })}
				label="Task"
				multiline
			/>
			<Button className={TaskFormStyle.button} disabled={disableButton}>
				Add Task
			</Button>
		</form>
	);
};
