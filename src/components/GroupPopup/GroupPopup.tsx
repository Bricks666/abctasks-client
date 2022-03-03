import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { MainPopup } from "@/ui/MainPopup";
import { useGetParam, useGoBack, useGroup } from "@/hooks";
import { GroupForm } from "./GroupForm";
import { GET_PARAMS } from "@/const";
import { createGroup, editGroup } from "@/models/Groups";

interface GroupPopupProps extends ClassNameProps {
	readonly isOpen: boolean;
}

export const GroupPopup: FC<GroupPopupProps> = ({ isOpen, className }) => {
	const onClose = useGoBack();
	const id = useGetParam(GET_PARAMS.groupId);
	const group = useGroup(id ? +id : null);
	return (
		<MainPopup
			className={className}
			isOpen={isOpen}
			onClose={onClose}
			header="Edit group"
		>
			<GroupForm
				afterSubmit={onClose}
				defaultState={group}
				submitHandler={group ? editGroup : createGroup}
			/>
		</MainPopup>
	);
};
