import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { MainPopup } from "@/ui/MainPopup";
import { useGoBack } from "@/hooks";
import { GroupForm } from "../GroupForm";
import { createGroup } from "@/models/Groups";

interface CreateGroupPopupProps extends ClassNameProps {
	readonly isOpen: boolean;
}

export const CreateGroupPopup: FC<CreateGroupPopupProps> = ({
	isOpen,
	className,
}) => {
	const onClose = useGoBack();
	return (
		<MainPopup
			className={className}
			isOpen={isOpen}
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
