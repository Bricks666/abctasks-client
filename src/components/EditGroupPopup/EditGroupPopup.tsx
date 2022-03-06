import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { MainPopup } from "@/ui/MainPopup";
import { useGetParam, useGoBack, useGroup } from "@/hooks";
import { GroupForm } from "../GroupForm";
import { GET_PARAMS } from "@/const";
import { editGroup } from "@/models/Groups";

interface EditGroupPopupProps extends ClassNameProps {
	readonly isOpen: boolean;
}

export const EditGroupPopup: FC<EditGroupPopupProps> = ({ isOpen, className }) => {
	const onClose = useGoBack();
	const id = useGetParam(GET_PARAMS.groupId);
	const group = useGroup(id ? +id : null);
	return (
		<MainPopup
			className={className}
			isOpen={isOpen}
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
