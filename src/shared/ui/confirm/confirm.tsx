import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material';
import * as React from 'react';
import { BasePopupProps, CommonProps, VoidFunction } from '@/shared/types';

export interface ConfirmProps extends BasePopupProps, CommonProps {
	readonly title: string;
	readonly onClose: VoidFunction;
	readonly onAgree: VoidFunction;
	readonly onDisagree: VoidFunction;
	readonly agreeText: string;
	readonly disagreeText: string;
	readonly content: string;
}

export const Confirm: React.FC<ConfirmProps> = (props) => {
	const {
		isOpen,
		agreeText,
		disagreeText,
		onAgree,
		onDisagree,
		onClose,
		title,
		content,
		className,
	} = props;
	return (
		<Dialog open={isOpen} onClose={onClose} maxWidth='sm' fullWidth>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText className={className}>{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onDisagree} color='primary' autoFocus>
					{disagreeText}
				</Button>
				<Button onClick={onAgree} color='error'>
					{agreeText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
