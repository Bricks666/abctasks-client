import CloseIcon from '@mui/icons-material/Close';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton
} from '@mui/material';
import * as React from 'react';
import { CommonProps, VoidFunction } from '@/shared/types';

import styles from './main-popup.module.css';

export interface MainPopupProps extends CommonProps {
	readonly isOpen: boolean;
	readonly onClose: VoidFunction;
	readonly title: string;
	readonly actions?: React.ReactElement;
}

export const MainPopup: React.FC<React.PropsWithChildren<MainPopupProps>> = (
	props
) => {
	const { isOpen, onClose, children, className, title, actions, } = props;
	return (
		<Dialog open={isOpen} onClose={onClose} maxWidth='sm' fullWidth>
			<DialogTitle align='center'>
				{title}
				<IconButton className={styles.cross} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent className={className}>{children}</DialogContent>
			{actions ? <DialogActions>{actions}</DialogActions> : null}
		</Dialog>
	);
};
