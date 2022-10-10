import * as React from 'react';
import classNames from 'classnames';
import { CommonProps } from '@/interfaces/common';

import SvgIconStyle from './SvgIcon.module.css';

export interface SvgIconProps extends CommonProps {
	readonly viewBox: string;
	readonly title?: string;
}

export const SvgIcon: React.FC<React.PropsWithChildren<SvgIconProps>> =
	React.memo(function SvgIcon({ children, className, viewBox, title }) {
		return (
			<svg
				className={classNames(SvgIconStyle.icon, className)}
				viewBox={viewBox}
				aria-label={title}>
				{children}
			</svg>
		);
	});
