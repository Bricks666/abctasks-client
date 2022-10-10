import * as React from 'react';
import classNames from 'classnames';
import { CommonProps, VoidFunction } from '@/interfaces/common';
import { Block } from '../Block';
import { Collapse } from '../Collapse';
import { PopupContent } from '../PopupContent';
import { PopupHeader } from '../PopupHeader';
import { Portal } from '../Portal';

import FullScreenPopupStyle from './FullScreenPopup.module.css';

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
			<div className={FullScreenPopupStyle.container}>
				<Collapse origin='bottom' open={isOpen} duration={300}>
					<Block className={FullScreenPopupStyle.block}>
						<PopupHeader onClose={onClose}>{header}</PopupHeader>
						<PopupContent
							className={classNames(FullScreenPopupStyle.content, className)}>
							{children}
						</PopupContent>
					</Block>
				</Collapse>
			</div>
		</Portal>
	);
};
