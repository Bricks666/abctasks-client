/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import React, { FC, useCallback } from "react";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { GET_PARAMS } from "@/const";
import { useGetParam, useGoBack, useTask, useTaskGroups } from "@/hooks";
import { ClassNameProps, ID } from "@/interfaces/common";
import { editTask } from "@/models/Tasks";
import { TaskStatus, TaskStructure } from "@/models/Tasks/types";
import { Field } from "../Field";
import { joiResolver } from "@hookform/resolvers/joi";
import { validatingScheme } from "./validator";
import { useTranslation } from "react-i18next";
import { Button, MenuItem } from "@mui/material";

import EditTaskFromStyle from "./EditTaskForm.module.css";
import { Select } from "../Select";

export interface EditTaskFormValues {
	readonly content: string;
	readonly groupId: ID;
	readonly status: TaskStatus;
}

const prepareTask = (task: TaskStructure | null): EditTaskFormValues => {
	return task
		? {
				content: task.content,
				groupId: task.groupId,
				status: task.status,
		  }
		: {
				content: "",
				groupId: 0,
				status: TaskStatus.READY,
		  };
};

const statuses = {
	[TaskStatus.READY]: "ready",
	[TaskStatus.IN_PROGRESS]: "inProgress",
	[TaskStatus.REVIEW]: "review",
	[TaskStatus.DONE]: "done",
};

export const EditTaskForm: FC<ClassNameProps> = ({ className }) => {
	const taskId = useGetParam(GET_PARAMS.taskId);
	const task = useTask(taskId);
	const groups = useTaskGroups();
	const goBack = useGoBack();
	const { t } = useTranslation(["popups", "room"]);
	const { register, handleSubmit, formState, control } =
		useForm<EditTaskFormValues>({
			defaultValues: prepareTask(task),
			resolver: joiResolver(validatingScheme),
		});

	const onSubmit = useCallback<SubmitHandler<EditTaskFormValues>>(
		({ groupId, status, ...values }) => {
			editTask({
				...values,
				id: +taskId!,
				status,
				groupId,
				roomId: task?.roomId || 0,
			});
			goBack();
		},
		[goBack, taskId, task?.roomId]
	);
	const { isDirty } = formState;
	return (
		<form
			className={classNames(EditTaskFromStyle.form, className)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Select control={control} name="groupId" label={t("edit_task.group")}>
				{groups.map(({ id, name }) => (
					<MenuItem value={id} key={id}>
						{name}
					</MenuItem>
				))}
			</Select>
			<Select control={control} name="status" label={t("edit_task.status")}>
				{Object.entries(statuses).map(([code, name]) => (
					<MenuItem value={code} key={code}>
						{t(`statuses.${name}`, { ns: "room" })}
					</MenuItem>
				))}
			</Select>

			<Field
				className={EditTaskFromStyle.textarea}
				{...register("content")}
				multiline
				label={t("edit_task.content")}
			/>
			<Button
				className={EditTaskFromStyle.button}
				disabled={!isDirty}
				type="submit"
			>
				{t("edit_task.button")}
			</Button>
		</form>
	);
};
