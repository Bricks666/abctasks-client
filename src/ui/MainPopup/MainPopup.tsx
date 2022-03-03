import classNames from "classnames";
import React, { FC, MouseEventHandler } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Overlay } from "../Overlay";
import { PopupHeader } from "../PopupHeader";
import { Fade } from "../Fade";
import { PopupContent } from "../PopupContent";

import MainPopupStyle from "./MainPopup.module.css";

interface MainPopupComponent extends ClassNameProps {
	readonly isOpen: boolean;
	readonly onClose: MouseEventHandler;
	readonly header?: string;
}

export const MainPopup: FC<MainPopupComponent> = ({
	isOpen,
	onClose,
	children,
	className,
	header,
}) => {
	return (
		<Overlay onClose={onClose}>
			<Fade open={isOpen} className={MainPopupStyle.overlay}>
				<PopupHeader onClose={onClose}>{header}</PopupHeader>
				<PopupContent className={classNames(MainPopupStyle.content, className)}>
					{children}
				</PopupContent>
			</Fade>
		</Overlay>
	);
};
