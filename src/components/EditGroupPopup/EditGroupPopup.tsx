import React, { FC } from "react";
import { BasePopup, ClassNameProps } from "@/interfaces/common";
import { MainPopup } from "@/ui/MainPopup";
import { useGetParam, useGoBack, useGroup } from "@/hooks";
import { GroupForm } from "../GroupForm";
import { GET_PARAMS } from "@/const";
import { editGroup } from "@/models/Groups";
import { useTranslation } from "react-i18next";

interface EditGroupPopupProps extends ClassNameProps, BasePopup {}

export const EditGroupPopup: FC<EditGroupPopupProps> = (props) => {
	const onClose = useGoBack();
	const { t } = useTranslation("popups");
	const id = useGetParam(GET_PARAMS.groupId);
	const group = useGroup(id ? +id : null);
	return (
		<MainPopup
			{...props}
			onClose={onClose}
			header={t("edit_task.title")}
			alt={t("edit_task.title")}
		>
			<GroupForm
				afterSubmit={onClose}
				defaultState={group}
				submitHandler={editGroup}
				buttonText={t("edit_task.button")}
			/>
		</MainPopup>
	);
};
