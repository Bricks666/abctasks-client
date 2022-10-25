import * as React from 'react';
import { CommonProps, VoidFunction } from '@/types';
import { Block } from '../Block';
import { Collapse } from '../Collapse';
import { PopupContent } from '../PopupContent';
import { PopupHeader } from '../PopupHeader';
import { Portal } from '../Portal';

import styles from './FullScreenPopup.module.css';

export interface FillScreenPopupProps extends CommonProps {
	readonly isOpen: boolean;
	readonly onClose: VoidFunction;
	readonly header: string;
}

export const FullScreenPopup: React.FC<
	React.PropsWithChildren<FillScreenPopupProps>
> = ({ children, className, isOpen, onClose, header }) => {
	return (
		<Portal>
			<div className={styles.container}>
				<Collapse origin='bottom' open={isOpen} duration={300}>
					<Block className={styles.block}>
						<PopupHeader onClose={onClose}>{header}</PopupHeader>
						<PopupContent className={className}>{children}</PopupContent>
					</Block>
				</Collapse>
			</div>
		</Portal>
	);
};
