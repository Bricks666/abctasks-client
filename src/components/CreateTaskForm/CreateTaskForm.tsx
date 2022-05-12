import classNames from "classnames";
import React, { FC, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { GET_PARAMS } from "@/const";
import { useGetParam, useTaskGroups } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { createTask } from "@/models/Tasks";
import { TaskStatus } from "@/models/Tasks/types";
import { Button } from "@/ui/Button";
import { TextField } from "../TextField";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationScheme } from "./validator";
import { useParams } from "react-router-dom";

import TaskFormStyle from "./CreateTaskForm.module.css";

export interface TaskFormValues {
	readonly content: string;
	readonly groupId: number;
}

export const CreateTaskForm: FC<ClassNameProps> = ({ className }) => {
	const status =
		useGetParam<TaskStatus>(GET_PARAMS.taskStatus) || TaskStatus.READY;
	const { id: roomId } = useParams();
	const groups = useTaskGroups();
	const { t } = useTranslation("popups");

	const { handleSubmit, formState, register, reset } = useForm<TaskFormValues>({
		defaultValues: { content: "", groupId: -1 },
		resolver: joiResolver(validationScheme),
	});

	const onSubmit = useCallback<SubmitHandler<TaskFormValues>>(
		(values) => {
			createTask({
				...values,
				status,
				roomId: roomId!,
			});
			reset();
		},
		[status, reset, roomId]
	);

	const { isDirty, isSubmitting, errors } = formState;
	const disableButton = !isDirty || isSubmitting;

	return (
		<form
			className={classNames(TaskFormStyle.form, className)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<TextField
				{...register("groupId", { disabled: isSubmitting })}
				select
				label={t("add_task.group")}
				error={errors.groupId?.message}
			>
				<option value={-1} />
				{groups.map(({ id, name }) => (
					<option value={id} key={id}>
						{name}
					</option>
				))}
			</TextField>
			<TextField
				className={TaskFormStyle.textarea}
				{...register("content", { disabled: isSubmitting })}
				label={t("add_task.content")}
				multiline
				error={errors.content?.message}
			/>
			<Button className={TaskFormStyle.button} disabled={disableButton}>
				{t("add_task.button")}
			</Button>
		</form>
	);
};
