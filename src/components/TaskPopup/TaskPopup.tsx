import React, { FC } from "react";
import { useGoBack } from "../../hooks";
import { ClassNameComponent } from "../../interfaces/common";
import { MainPopup } from "../../ui/MainPopup";
import { TaskForm } from "../TaskForm";

import TaskPopupStyle from "./TaskPopup.module.css";

interface TaskPopupComponent extends ClassNameComponent {
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
