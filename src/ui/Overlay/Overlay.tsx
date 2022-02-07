/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { EventHandler, FC, SyntheticEvent } from "react";
import { Portal } from "../Portal";

interface OverlayComponent {
	readonly close: EventHandler<SyntheticEvent<HTMLElement>>;
	readonly isOpen: boolean;
}

export const Overlay: FC<OverlayComponent> = ({ children, close, isOpen }) => {
	return isOpen ? (
		<Portal>
			<div role="dialog">
				<div role="button" onClick={close} tabIndex={0} />
				{children}
			</div>
		</Portal>
	) : null;
};
