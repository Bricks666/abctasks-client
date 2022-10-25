import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types';

import styles from './SvgIcon.module.css';

export interface SvgIconProps extends CommonProps {
	readonly viewBox: string;
	readonly title?: string;
}

export const SvgIcon: React.FC<React.PropsWithChildren<SvgIconProps>> =
	React.memo(function SvgIcon({ children, className, viewBox, title }) {
		return (
			<svg
				className={cn(styles.icon, className)}
				viewBox={viewBox}
				aria-label={title}>
				{children}
			</svg>
		);
	});
