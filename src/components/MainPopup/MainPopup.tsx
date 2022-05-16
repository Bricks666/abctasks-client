import React, { FC, MouseEventHandler } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogProps,
	DialogTitle,
} from "@mui/material";

interface MainPopupComponent extends DialogProps {
	readonly header?: string;
	readonly alt?: string;
}

export const MainPopup: FC<MainPopupComponent> = ({
	onClose,
	children,
	header,
	alt,
	maxWidth = false,
	...props
}) => {
	return (
		<Dialog
			onClose={onClose}
			aria-labelledby={alt}
			maxWidth={maxWidth}
			{...props}
		>
			<DialogTitle>{header}</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				<Button onClick={onClose as unknown as MouseEventHandler}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};
