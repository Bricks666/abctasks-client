import CloseIcon from '@mui/icons-material/Close';
import {
	Breakpoint,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	DialogTitleProps,
	IconButton
} from '@mui/material';
import * as React from 'react';

import { BasePopupProps, CommonProps, VoidFunction } from '@/shared/types';

import styles from './main-popup.module.css';

export interface MainPopupProps extends CommonProps, BasePopupProps {
	readonly onClose: VoidFunction;
	readonly title: string;
	readonly maxWidth?: Breakpoint;
	readonly DialogTitleProps?: DialogTitleProps;
}

export const MainPopup: React.FC<React.PropsWithChildren<MainPopupProps>> = (
	props
) => {
	const {
		isOpen,
		onClose,
		children,
		className,
		title,
		slots,
		DialogTitleProps,
		maxWidth = 'sm',
	} = props;

	return (
		<Dialog open={isOpen} onClose={onClose} maxWidth={maxWidth} fullWidth>
			<DialogTitle align='center' {...DialogTitleProps}>
				{title}
				<IconButton className={styles.cross} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent className={className}>{children}</DialogContent>
			{slots?.actions ? <DialogActions>{slots.actions}</DialogActions> : null}
		</Dialog>
	);
};
