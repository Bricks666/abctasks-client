/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, MouseEventHandler } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Portal } from "../Portal";

import OverlayStyle from "./Overlay.module.css";

interface OverlayComponent extends ClassNameProps {
	readonly onClose: MouseEventHandler;
	readonly alt?: string;
}

export const Overlay: FC<OverlayComponent> = ({
	children,
	onClose,
	className,
	alt,
}) => {
	return (
		<Portal>
			<div className={OverlayStyle.dialog} role="dialog" aria-label={alt}>
				<div
					className={OverlayStyle.button}
					role="button"
					onClick={onClose}
					tabIndex={0}
					title="overlay"
				/>
				<div className={className}>{children}</div>
			</div>
		</Portal>
	);
};
