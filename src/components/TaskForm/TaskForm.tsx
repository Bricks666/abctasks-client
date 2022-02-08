import classNames from "classnames";
import React, { FC, useCallback, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GET_PARAMS } from "../../const";
import { useGetParam, useTaskGroups } from "../../hooks";
import { ClassNameComponent } from "../../interfaces/common";
import { createTask, TaskStatus } from "../../models/Tasks";
import { Button } from "../../ui/Button";
import { Select, SelectValues } from "../../ui/Select";
import { Textarea } from "../../ui/Textarea";
import { useGroupsSelectStyles } from "./useGroupsSelectStyles";

import TaskFormStyle from "./TaskForm.module.css";

interface TaskFormValues {
	readonly content: string;
	readonly group: SelectValues<number>;
}

export const TaskForm: FC<ClassNameComponent> = ({ className }) => {
	const status = useGetParam<TaskStatus>(GET_PARAMS.taskStatus) || "Ready";
	const groups = useTaskGroups();
	const groupsOptions = useMemo<SelectValues[]>(() => {
		return groups.map((group) => ({ value: group.id, label: group.name }));
	}, [groups]);

	const styles = useGroupsSelectStyles(groups);
	const { register, handleSubmit, formState, control, reset } =
		useForm<TaskFormValues>({
			defaultValues: {
				content: "",
				group: {},
			},
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

	const { isDirty, isValid, isSubmitting } = formState;
	const disableBUtton = !isDirty || !isValid || isSubmitting;

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
			<Textarea
				className={TaskFormStyle.textarea}
				{...register("content")}
				required={true}
				disabled={isSubmitting}
			>
				Task
			</Textarea>
			<Button
				className={TaskFormStyle.button}
				disabled={disableBUtton}
				buttonType="submit"
			>
				Add Task
			</Button>
		</form>
	);
};
