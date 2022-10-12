import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types/common';
import { CrossIcon } from '../CrossIcon';
import { IconButton } from '../IconButton';
import { Text } from '../Text';

import styles from './PopupHeader.module.css';

export interface PopupHeaderProps extends CommonProps {
	readonly onClose?: React.MouseEventHandler;
	readonly closeIcon?: React.ReactNode;
}

export const PopupHeader: React.FC<
	React.PropsWithChildren<PopupHeaderProps>
> = ({ className, children, onClose, closeIcon }) => {
	return (
		<header className={cn(styles.header, className)}>
			{children && (
				<Text className={styles.text} component='h2'>
					{children}
				</Text>
			)}
			{onClose && (
				<IconButton onClick={onClose}>
					{closeIcon ?? <CrossIcon className={styles.icon} />}
				</IconButton>
			)}
		</header>
	);
};
