/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import React, { FC, useCallback } from "react";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { GET_PARAMS } from "@/const";
import { useGetParam, useGoBack, useTask, useTaskGroups } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { editTask } from "@/models/Tasks";
import { TaskStatus, TaskStructure } from "@/models/Tasks/types";
import { TaskGroup } from "@/models/Groups/types";
import { Button } from "@/ui/Button";
import { TextField } from "../TextField";
import { useGroup } from "@/hooks/useGroup";
import { joiResolver } from "@hookform/resolvers/joi";
import { validatingScheme } from "./validator";

import EditTaskFromStyle from "./EditTaskForm.module.css";

export interface EditTaskFormValues {
	readonly content: string;
	readonly groupId: number;
	readonly status: TaskStatus;
}

const prepareTask = (
	task: TaskStructure | null,
	group: TaskGroup | null
): EditTaskFormValues => {
	return task && group
		? {
				content: task.content,
				groupId: group.id,
				status: task.status,
		  }
		: {
				content: "",
				groupId: 0,
				status: "Ready",
		  };
};

const statuses = ["Ready", "In Progress", "Review", "Done"];

export const EditTaskForm: FC<ClassNameProps> = ({ className }) => {
	const taskId = useGetParam(GET_PARAMS.taskId);
	const task = useTask(taskId);
	const group = useGroup(task?.groupId || null);
	const groups = useTaskGroups();
	const goBack = useGoBack();
	const { register, handleSubmit, formState } = useForm<EditTaskFormValues>({
		defaultValues: prepareTask(task, group),
		resolver: joiResolver(validatingScheme),
	});

	const onSubmit = useCallback<SubmitHandler<EditTaskFormValues>>(
		({ groupId, status, ...values }) => {
			editTask({
				...values,
				id: +(taskId as unknown as number),
				status,
				groupId,
			});
			goBack();
		},
		[goBack, taskId]
	);
	const { isDirty } = formState;

	return (
		<form
			className={classNames(EditTaskFromStyle.form, className)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<TextField {...register("groupId")} select label="Group">
				{groups.map(({ id, name }) => (
					<option value={id} key={id}>
						{name}
					</option>
				))}
			</TextField>
			<TextField {...register("status")} select label="Status">
				{statuses.map((status) => (
					<option value={status} key={status}>
						{status}
					</option>
				))}
			</TextField>

			<TextField
				className={EditTaskFromStyle.textarea}
				{...register("content")}
				multiline
				label="Content"
			/>
			<Button className={EditTaskFromStyle.button} disabled={!isDirty}>
				Save edit
			</Button>
		</form>
	);
};
