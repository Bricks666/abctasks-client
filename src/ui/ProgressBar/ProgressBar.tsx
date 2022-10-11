/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import cn from 'classnames';
import { HEX, CommonProps } from '@/interfaces/common';
import { Text } from '../Text';

import styles from './ProgressBar.module.css';

export interface ProgressBarProps extends CommonProps {
	readonly children: string | number;
	readonly maxValue: number;
	readonly currentValue: number;
	readonly ariaText?: string;
	readonly progressbarColor?: HEX;
	readonly progressbarBGColor?: HEX;
}

export const ProgressBar: React.FC<ProgressBarProps> = React.memo(
	function ProgressBar({
		currentValue,
		maxValue,
		children,
		className,
		ariaText,
		progressbarBGColor,
		progressbarColor,
	}) {
		const CSSstyles: React.CSSProperties = {
			backgroundColor: progressbarBGColor || 'white',
		};
		const progress: React.CSSProperties = {
			backgroundColor: progressbarColor || 'blue',
			transform: `scaleX(${(currentValue / maxValue) * 100}%)`,
		};

		return (
			<label className={cn(styles.label, className)}>
				{children}
				<Text
					component='span'
					className={
						styles.progressNumbers
					}>{`${currentValue}/${maxValue}`}</Text>
				<div className={styles.progressbar} style={CSSstyles}>
					<div
						className={styles.progress}
						style={progress}
						role='progressbar'
						aria-valuemin={0}
						aria-valuemax={maxValue}
						aria-valuenow={currentValue}
						aria-label={ariaText}
					/>
				</div>
			</label>
		);
	}
);
