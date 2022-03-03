import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { MainPopup } from "@/ui/MainPopup";
import { useGoBack } from "@/hooks";
import { CreateGroupForm } from "../CreateGroupForm";

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
			onClose={onClose}
			isOpen={isOpen}
			header="Create group"
		>
			<CreateGroupForm />
		</MainPopup>
	);
};
