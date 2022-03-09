import React, { FC } from "react";
import { useGoBack } from "@/hooks";
import { BasePopup, ClassNameProps } from "@/interfaces/common";
import { MainPopup } from "@/ui/MainPopup";
import { EditTaskForm } from "../EditTaskForm";

import EditTaskPopupStyle from "./EditTaskPopup.module.css";

interface EditTaskPopupProps extends ClassNameProps, BasePopup {}

export const EditTaskPopup: FC<EditTaskPopupProps> = (props) => {
	const onClose = useGoBack();

	return (
		<MainPopup {...props} onClose={onClose} header="Edit task">
			<EditTaskForm className={EditTaskPopupStyle.form} />
		</MainPopup>
	);
};
