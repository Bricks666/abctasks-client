import React, { FC } from "react";
import { useGoBack } from "@/hooks";
import { BasePopup, ClassNameProps } from "@/interfaces/common";
import { MainPopup } from "@/ui/MainPopup";
import { CreateTaskForm } from "../CreateTaskForm";
import { useTranslation } from "react-i18next";

import TaskPopupStyle from "./CreateTaskPopup.module.css";

interface CreateTaskPopupProps extends ClassNameProps, BasePopup {}

export const CreateTaskPopup: FC<CreateTaskPopupProps> = (props) => {
	const onClose = useGoBack();
	const { t } = useTranslation("popups");

	return (
		<MainPopup {...props} header={t("add_task.title")} onClose={onClose}>
			<CreateTaskForm className={TaskPopupStyle.form} />
		</MainPopup>
	);
};
