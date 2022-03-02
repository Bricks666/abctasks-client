/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, MouseEventHandler } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Portal } from "../Portal";

import OverlayStyle from "./Overlay.module.css";

interface OverlayComponent extends ClassNameProps {
	readonly onClose: MouseEventHandler;
}

export const Overlay: FC<OverlayComponent> = ({
	children,
	onClose,
	className,
}) => {
	return (
		<Portal>
			<div className={OverlayStyle.dialog} role="dialog">
				<div
					className={OverlayStyle.button}
					role="button"
					onClick={onClose}
					tabIndex={0}
				/>
				<div className={className}>{children}</div>
			</div>
		</Portal>
	);
};
