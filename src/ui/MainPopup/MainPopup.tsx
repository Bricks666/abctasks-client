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
		<Overlay onClose={onClose}>
			<Fade
				open={isOpen}
				className={classNames(MainPopupStyle.overlay, className)}
			>
				<PopupHeader onClose={onClose}>{label}</PopupHeader>
				<PopupContent className={MainPopupStyle.content}>
					{children}
				</PopupContent>
			</Fade>
		</Overlay>
	);
};
