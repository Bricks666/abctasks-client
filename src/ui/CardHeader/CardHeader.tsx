import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { Text } from '../Text';

import CardHeaderStyle from './CardHeader.module.css';

export interface CardHeaderProps extends CommonProps {
	readonly secondaryAction?: React.ReactElement;
}

export const CardHeader: React.FC<React.PropsWithChildren<CardHeaderProps>> =
	React.memo(function CardHeader({ children, className, secondaryAction }) {
		return (
			<header className={cn(CardHeaderStyle.header, className)}>
				<Text className={CardHeaderStyle.head} component='p' variant='h3'>
					{children}
				</Text>
				{secondaryAction && (
					<div className={CardHeaderStyle.secondaryAction}>
						{secondaryAction}
					</div>
				)}
			</header>
		);
	});
