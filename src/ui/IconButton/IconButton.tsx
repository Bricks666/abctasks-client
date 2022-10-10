import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/interfaces/common';
import { Size } from '@/interfaces/ui';
import { BaseButton, BaseButtonProps } from '../BaseButton';

import IconButtonStyle from './IconButton.module.css';

export interface IconButtonProps extends CommonProps, BaseButtonProps {
	readonly size?: Size;
}

export const IconButton: React.FC<IconButtonProps> = React.memo(
	function IconBase({ className, children, size = 'medium', ...button }) {
		const classes = cn(
			IconButtonStyle.button,
			IconButtonStyle[size],
			className
		);
		return (
			<BaseButton className={classes} {...button}>
				{children}
			</BaseButton>
		);
	}
);
