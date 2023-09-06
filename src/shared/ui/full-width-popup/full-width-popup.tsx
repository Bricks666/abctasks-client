import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import * as React from 'react';

import { BasePopupProps, VoidFunction } from '@/shared/types';

import styles from './full-width-popup.module.css';

export interface FullWidthPopupProps
	extends BasePopupProps,
		React.PropsWithChildren {
	readonly onClose: VoidFunction;
	readonly title: string;
}

export const FullWidthPopup: React.FC<FullWidthPopupProps> = (props) => {
	const { isOpen, onClose, title, className, children, } = props;

	return (
		<Dialog open={isOpen} onClose={onClose} fullScreen>
			<DialogTitle align='center'>
				{title}
				<IconButton className={styles.cross} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent className={className}>{children}</DialogContent>
		</Dialog>
	);
};
