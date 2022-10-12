import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types/common';
import { Text } from '../Text';

import styles from './CardHeader.module.css';

export interface CardHeaderProps extends CommonProps {
	readonly secondaryAction?: React.ReactElement;
}

export const CardHeader: React.FC<React.PropsWithChildren<CardHeaderProps>> =
	React.memo(function CardHeader({ children, className, secondaryAction }) {
		return (
			<header className={cn(styles.header, className)}>
				<Text className={styles.head} component='p' variant='h3'>
					{children}
				</Text>
				{secondaryAction && (
					<div className={styles.secondaryAction}>{secondaryAction}</div>
				)}
			</header>
		);
	});
