import React, { FC } from "react";
import { useGoBack } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { MainPopup } from "@/ui/MainPopup";
import { EditTaskForm } from "../EditTaskForm";

import EditTaskPopupStyle from "./EditTaskPopup.module.css";

interface EditTaskPopupProps extends ClassNameProps {
	readonly isOpen: boolean;
}

export const EditTaskPopup: FC<EditTaskPopupProps> = ({ isOpen }) => {
	const onClose = useGoBack();

	return (
		<MainPopup isOpen={isOpen} onClose={onClose} header="Edit task">
			<EditTaskForm className={EditTaskPopupStyle.form} />
		</MainPopup>
	);
};
