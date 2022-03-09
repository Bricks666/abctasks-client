import React, { FC } from "react";
import { BasePopup, ClassNameProps } from "@/interfaces/common";
import { MainPopup } from "@/ui/MainPopup";
import { useGetParam, useGoBack, useGroup } from "@/hooks";
import { GroupForm } from "../GroupForm";
import { GET_PARAMS } from "@/const";
import { editGroup } from "@/models/Groups";

interface EditGroupPopupProps extends ClassNameProps, BasePopup {}

export const EditGroupPopup: FC<EditGroupPopupProps> = (props) => {
	const onClose = useGoBack();
	const id = useGetParam(GET_PARAMS.groupId);
	const group = useGroup(id ? +id : null);
	return (
		<MainPopup
			{...props}
			onClose={onClose}
			header="Edit group"
			alt="Edit group popup"
		>
			<GroupForm
				afterSubmit={onClose}
				defaultState={group}
				submitHandler={editGroup}
				buttonText={"Save edit"}
			/>
		</MainPopup>
	);
};
