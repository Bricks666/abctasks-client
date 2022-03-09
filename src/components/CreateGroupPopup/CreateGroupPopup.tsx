import React, { FC } from "react";
import { BasePopup, ClassNameProps } from "@/interfaces/common";
import { MainPopup } from "@/ui/MainPopup";
import { useGoBack } from "@/hooks";
import { GroupForm } from "../GroupForm";
import { createGroup } from "@/models/Groups";

interface CreateGroupPopupProps extends ClassNameProps, BasePopup {}

export const CreateGroupPopup: FC<CreateGroupPopupProps> = (props) => {
	const onClose = useGoBack();
	return (
		<MainPopup
			{...props}
			onClose={onClose}
			header="Create group"
			alt="Create group popup"
		>
			<GroupForm
				afterSubmit={onClose}
				submitHandler={createGroup}
				buttonText="Add group"
			/>
		</MainPopup>
	);
};
