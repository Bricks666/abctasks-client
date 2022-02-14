import classNames from "classnames";
import React, { FC, MouseEventHandler } from "react";
import { ClassNameProps } from "../../interfaces/common";
import { Overlay } from "../Overlay";
import { PopupHeader } from "../PopupHeader";

import MainPopupStyle from "./MainPopup.module.css";

interface MainPopupComponent extends ClassNameProps {
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
			<PopupHeader onClose={onClose}>{label}</PopupHeader>
			<div className={MainPopupStyle.content}>{children}</div>
		</Overlay>
	);
};
