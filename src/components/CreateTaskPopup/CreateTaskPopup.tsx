import React, { FC } from "react";
import { useGoBack } from "@/hooks";
import { BasePopup, ClassNameProps } from "@/interfaces/common";
import { MainPopup } from "@/ui/MainPopup";
import { CreateTaskForm } from "../CreateTaskForm";

import TaskPopupStyle from "./CreateTaskPopup.module.css";

interface CreateTaskPopupProps extends ClassNameProps, BasePopup {}

export const CreateTaskPopup: FC<CreateTaskPopupProps> = (props) => {
	const onClose = useGoBack();

	return (
		<MainPopup {...props} header="Create task" onClose={onClose}>
			<CreateTaskForm className={TaskPopupStyle.form} />
		</MainPopup>
	);
};
