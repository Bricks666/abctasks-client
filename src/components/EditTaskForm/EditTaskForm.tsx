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
import { useTranslation } from "react-i18next";

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

const statuses = {
	ready: "Ready",
	inProgress: "In Progress",
	review: "Review",
	done: "Done",
};

export const EditTaskForm: FC<ClassNameProps> = ({ className }) => {
	const taskId = useGetParam(GET_PARAMS.taskId);
	const task = useTask(taskId);
	const group = useGroup(task?.groupId || null);
	const groups = useTaskGroups();
	const goBack = useGoBack();
	const { t } = useTranslation(["popups", "room"]);
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
			<TextField {...register("groupId")} select label={t("edit_task.group")}>
				{groups.map(({ id, name }) => (
					<option value={id} key={id}>
						{name}
					</option>
				))}
			</TextField>
			<TextField {...register("status")} select label={t("edit_task.status")}>
				{Object.entries(statuses).map(([key, value]) => (
					<option value={value} key={value}>
						{t(`statuses.${key}`, { ns: "room" })}
					</option>
				))}
			</TextField>

			<TextField
				className={EditTaskFromStyle.textarea}
				{...register("content")}
				multiline
				label={t("edit_task.content")}
			/>
			<Button className={EditTaskFromStyle.button} disabled={!isDirty}>
				{t("edit_task.button")}
			</Button>
		</form>
	);
};
