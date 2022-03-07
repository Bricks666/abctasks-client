/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import React, { FC, useCallback } from "react";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { GET_PARAMS } from "@/const";
import { useGetParam, useGoBack, useGroupSelector, useTask } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { editTask } from "@/models/Tasks";
import { TaskStatus, TaskStructure } from "@/models/Tasks/types";
import { TaskGroup } from "@/models/Groups/types";
import { Button } from "@/ui/Button";
import { Select, SelectValues } from "@/ui/Select";
import { TextField } from "../TextField";
import { useGroup } from "@/hooks/useGroup";

import EditTaskFromStyle from "./EditTaskForm.module.css";

interface EditTaskFormValues {
	readonly content: string;
	readonly group: SelectValues<number>;
	readonly status: SelectValues<TaskStatus>;
}

const prepareTask = (
	task: TaskStructure | null,
	group: TaskGroup | null
): EditTaskFormValues => {
	return task && group
		? {
				content: task.content,
				group: {
					label: group.name,
					value: group.id,
				},
				status: {
					label: task.status,
					value: task.status,
				},
		  }
		: {
				content: "",
				group: {
					label: "",
					value: 0,
				},
				status: { label: "Ready", value: "Ready" },
		  };
};

const statuses = [
	{
		label: "Ready",
		value: "Ready",
	},
	{
		label: "In Progress",
		value: "In Progress",
	},
	{
		label: "Review",
		value: "Review",
	},
	{
		label: "Done",
		value: "Done",
	},
];

export const EditTaskForm: FC<ClassNameProps> = ({ className }) => {
	const taskId = useGetParam(GET_PARAMS.taskId);
	const task = useTask(taskId);
	const group = useGroup(task?.groupId || null);
	const { groupsOptions, styles } = useGroupSelector();
	const goBack = useGoBack();
	const { control, handleSubmit, formState } = useForm<EditTaskFormValues>({
		defaultValues: prepareTask(task, group),
	});

	const onSubmit = useCallback<SubmitHandler<EditTaskFormValues>>(
		({ group, status, ...values }) => {
			const groupId = group.value;
			const statusName = status.value;
			editTask({
				...values,
				id: +(taskId as unknown as number),
				status: statusName,
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
			<Select options={statuses} name="status" control={control} />
			<Select
				options={groupsOptions}
				styles={styles}
				name="group"
				control={control}
			/>

			<TextField
				className={EditTaskFromStyle.textarea}
				name="content"
				control={control}
				multiline
			/>
			<Button className={EditTaskFromStyle.button} disabled={!isDirty}>
				Save edit
			</Button>
		</form>
	);
};
