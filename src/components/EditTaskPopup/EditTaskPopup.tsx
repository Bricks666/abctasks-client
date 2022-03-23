import React, { FC } from "react";
import { useGoBack } from "@/hooks";
import { BasePopup, ClassNameProps } from "@/interfaces/common";
import { MainPopup } from "@/ui/MainPopup";
import { EditTaskForm } from "../EditTaskForm";
import { useTranslation } from "react-i18next";

import EditTaskPopupStyle from "./EditTaskPopup.module.css";

interface EditTaskPopupProps extends ClassNameProps, BasePopup {}

export const EditTaskPopup: FC<EditTaskPopupProps> = (props) => {
	const onClose = useGoBack();
	const { t } = useTranslation("popups");

	return (
		<MainPopup {...props} onClose={onClose} header={t("edit_task.title")}>
			<EditTaskForm className={EditTaskPopupStyle.form} />
		</MainPopup>
	);
};
