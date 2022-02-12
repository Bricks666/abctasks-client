import React, { FC } from "react";
import { useGoBack } from "../../hooks";
import { ClassNameProps } from "../../interfaces/common";
import { MainPopup } from "../../ui/MainPopup";
import { TaskForm } from "../TaskForm";

import TaskPopupStyle from "./TaskPopup.module.css";

interface TaskPopupComponent extends ClassNameProps {
	readonly isOpen: boolean;
}

export const TaskPopup: FC<TaskPopupComponent> = ({ isOpen, className }) => {
	const onClose = useGoBack();

	return (
		<MainPopup
			className={className}
			isOpen={isOpen}
			label="Task form"
			onClose={onClose}
		>
			<TaskForm className={TaskPopupStyle.form} />
		</MainPopup>
	);
};
