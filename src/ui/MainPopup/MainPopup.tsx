import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { CommonProps, VoidFunction } from '@/types/common';

export interface MainPopupProps extends CommonProps {
	readonly isOpen: boolean;
	readonly onClose: VoidFunction;
	readonly header: string;
	readonly closeOnEsc?: boolean;
	readonly alt?: string;
}

export const MainPopup: React.FC<React.PropsWithChildren<MainPopupProps>> = ({
	isOpen,
	onClose,
	children,
	className,
	header,
}) => {
	return (
		<Dialog className={className} open={isOpen} onClose={onClose}>
			<DialogTitle align='center'>{header}</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
};
