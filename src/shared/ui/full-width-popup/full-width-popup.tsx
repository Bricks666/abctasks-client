import CloseIcon from '@mui/icons-material/Close';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Slide,
	SlideProps
} from '@mui/material';
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
	const { isOpen, onClose, title, className, children, slots, } = props;

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			TransitionComponent={Transition}
			fullScreen>
			<DialogTitle align='center'>
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

const Transition = React.forwardRef(function Transition(
	props: NonNullable<SlideProps>,
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />;
});
