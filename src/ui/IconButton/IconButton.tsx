import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/types/common';
import { Size } from '@/types/ui';
import { BaseButton, BaseButtonProps } from '../BaseButton';

import styles from './IconButton.module.css';

export interface IconButtonProps extends CommonProps, BaseButtonProps {
	readonly size?: Size;
}

export const IconButton: React.FC<IconButtonProps> = React.memo(
	function IconBase({ className, children, size = 'medium', ...button }) {
		const classes = cn(styles.button, styles[size], className);
		return (
			<BaseButton className={classes} {...button}>
				{children}
			</BaseButton>
		);
	}
);
