import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { CrossIcon } from '../CrossIcon';
import { IconButton } from '../IconButton';
import { Text } from '../Text';

import PopupHeaderStyle from './PopupHeader.module.css';

export interface PopupHeaderProps extends CommonProps {
	readonly onClose?: React.MouseEventHandler;
	readonly closeIcon?: React.ReactNode;
}

export const PopupHeader: React.FC<
	React.PropsWithChildren<PopupHeaderProps>
> = ({ className, children, onClose, closeIcon }) => {
	return (
		<header className={cn(PopupHeaderStyle.header, className)}>
			{children && (
				<Text className={PopupHeaderStyle.text} component='h2'>
					{children}
				</Text>
			)}
			{onClose && (
				<IconButton onClick={onClose}>
					{closeIcon ?? <CrossIcon className={PopupHeaderStyle.icon} />}
				</IconButton>
			)}
		</header>
	);
};
