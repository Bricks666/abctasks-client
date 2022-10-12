import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types/common';

import styles from './Text.module.css';

type Components = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface TextProps extends CommonProps {
	readonly component?: Components;
	readonly variant?: Components;
	readonly paddings?: boolean;
	readonly margins?: boolean;
	readonly cssStyles?: React.CSSProperties;
	readonly align?: 'start' | 'center' | 'end' | 'justify';
}

export const Text: React.FC<React.PropsWithChildren<TextProps>> = React.memo(
	function Text({
		children,
		className,
		cssStyles,
		component = 'p',
		variant = component,
		margins = false,
		align = 'start',
	}) {
		const element = React.createElement(component, {}, null);
		const classes = cn(
			styles.text,
			styles[variant],
			styles[align],
			{
				[styles.withoutMargins]: !margins,
			},
			className
		);
		return (
			<element.type className={classes} {...element.props} style={cssStyles}>
				{children}
			</element.type>
		);
	}
);
