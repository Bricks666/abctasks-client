import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Overlay } from "../Overlay";
import { PopupHeader } from "../PopupHeader";
import { Fade } from "../Fade";
import { PopupContent } from "../PopupContent";
import { useKeyListener } from "../hooks";

import MainPopupStyle from "./MainPopup.module.css";

interface MainPopupComponent extends ClassNameProps {
	readonly isOpen: boolean;
	readonly onClose: VoidFunction;
	readonly header?: string;
	readonly closeOnEsc?: boolean;
	readonly alt?: string;
}

export const MainPopup: FC<MainPopupComponent> = ({
	isOpen,
	onClose,
	children,
	className,
	header,
	alt,
	closeOnEsc = true,
}) => {
	useKeyListener("Escape", onClose, closeOnEsc);
	return (
		<Overlay onClose={onClose} alt={alt}>
			<Fade open={isOpen} className={MainPopupStyle.overlay}>
				<PopupHeader onClose={onClose}>{header}</PopupHeader>
				<PopupContent className={classNames(MainPopupStyle.content, className)}>
					{children}
				</PopupContent>
			</Fade>
		</Overlay>
	);
};
