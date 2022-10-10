import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/interfaces/common';

import LoadingIndicatorStyle from './LoadingIndicator.module.css';

type Size = 'small' | 'medium' | 'large';

export interface LoadingIndicatorProps extends CommonProps {
	readonly size?: Size;
	readonly text?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
	className,
	text,
	size = 'medium',
}) => {
	const classes = cn(
		LoadingIndicatorStyle.indicatorContainer,
		LoadingIndicatorStyle[size]
	);

	return (
		<div className={className}>
			<progress className='visibility-hidden' />
			<div className={classes}>
				<div className={LoadingIndicatorStyle.circleGroup}>
					<span
						className={cn(
							LoadingIndicatorStyle.circle,
							LoadingIndicatorStyle.circle1
						)}
					/>
					<span
						className={cn(
							LoadingIndicatorStyle.circle,
							LoadingIndicatorStyle.circle2
						)}
					/>
					<span
						className={cn(
							LoadingIndicatorStyle.circle,
							LoadingIndicatorStyle.circle3
						)}
					/>
					<span
						className={cn(
							LoadingIndicatorStyle.circle,
							LoadingIndicatorStyle.circle4
						)}
					/>
				</div>
				{text && <h2 className={LoadingIndicatorStyle.header}>{text}</h2>}
			</div>
		</div>
	);
};
