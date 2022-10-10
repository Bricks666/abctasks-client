/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { CommonProps } from '@/interfaces/common';
import { Portal } from '../Portal';

import OverlayStyle from './Overlay.module.css';

export interface OverlayComponent extends CommonProps {
	readonly onClose: React.MouseEventHandler;
	readonly alt?: string;
}

export const Overlay: React.FC<React.PropsWithChildren<OverlayComponent>> = ({
	children,
	onClose,
	className,
	alt,
}) => {
	return (
		<Portal>
			<div className={OverlayStyle.dialog} role='dialog' aria-label={alt}>
				<div
					className={OverlayStyle.button}
					role='button'
					onClick={onClose}
					tabIndex={0}
					title='overlay'
				/>
				<div className={className}>{children}</div>
			</div>
		</Portal>
	);
};
