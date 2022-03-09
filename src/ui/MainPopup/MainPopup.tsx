import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Overlay } from "../Overlay";
import { PopupHeader } from "../PopupHeader";
import { Fade } from "../Fade";
import { PopupContent } from "../PopupContent";
import { useKeyListener } from "../hooks";
import { FocusTrap } from "../FocusTrap";

import MainPopupStyle from "./MainPopup.module.css";

interface MainPopupComponent extends ClassNameProps {
	readonly isOpen: boolean;
	readonly onClose: VoidFunction;
	readonly header?: string;
	readonly closeOnEsc?: boolean;
	readonly alt?: string;
	readonly isFocus?: boolean;
}

export const MainPopup: FC<MainPopupComponent> = ({
	isOpen,
	onClose,
	children,
	className,
	header,
	alt,
	closeOnEsc = true,
	isFocus = isOpen,
}) => {
	useKeyListener("Escape", onClose, closeOnEsc && isFocus);
	return (
		<Overlay onClose={onClose} alt={alt}>
			<FocusTrap open={isFocus}>
				<Fade open={isOpen} className={MainPopupStyle.overlay}>
					<PopupHeader onClose={onClose}>{header}</PopupHeader>
					<PopupContent
						className={classNames(MainPopupStyle.content, className)}
					>
						{children}
					</PopupContent>
				</Fade>
			</FocusTrap>
		</Overlay>
	);
};
