import classNames from "classnames";
import React, { FC, MouseEventHandler } from "react";
import { ClassNameComponent } from "../../interfaces/common";
import { Overlay } from "../Overlay";
import { SectionHeader } from "../SectionHeader";

import MainPopupStyle from "./MainPopup.module.css";

interface MainPopupComponent extends ClassNameComponent {
	readonly isOpen: boolean;
	readonly onClose: MouseEventHandler;
	readonly label?: string;
}

export const MainPopup: FC<MainPopupComponent> = ({
	isOpen,
	onClose,
	children,
	className,
	label,
}) => {
	return (
		<Overlay
			className={classNames(MainPopupStyle.overlay, className)}
			isOpen={isOpen}
			onClose={onClose}
		>
			{label && <SectionHeader className={MainPopupStyle.header}>{label}</SectionHeader>}
			<div>{children}</div>
		</Overlay>
	);
};
