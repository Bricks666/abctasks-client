import React, { FC } from "react";
import { useGoBack } from "../../hooks";
import { ClassNameProps } from "../../interfaces/common";
import { MainPopup } from "../../ui/MainPopup";
import { CreateTaskForm } from "../CreateTaskForm";

import TaskPopupStyle from "./CreateTaskPopup.module.css";

interface CreateTaskPopupProps extends ClassNameProps {
	readonly isOpen: boolean;
}

export const CreateTaskPopup: FC<CreateTaskPopupProps> = ({
	isOpen,
	className,
}) => {
	const onClose = useGoBack();

	return (
		<MainPopup
			className={className}
			isOpen={isOpen}
			label="Task form"
			onClose={onClose}
		>
			<CreateTaskForm className={TaskPopupStyle.form} />
		</MainPopup>
	);
};
