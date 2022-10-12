import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types/common';
import { Color, Size } from '@/types/ui';
import { Picture } from '../Picture';
import { useLoadImage } from './useLoadImage';

import styles from './Avatar.module.css';

export interface AvatarProps
	extends CommonProps,
		Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
	readonly alt: string;
	readonly src?: string | null;
	readonly size?: Size;
	readonly color?: Color;
	readonly tabIndex?: number;
}

export const Avatar = React.memo(
	React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
		{
			className,
			children,
			alt,
			src,
			size = 'medium',
			color = 'primary',
			...props
		},
		ref
	) {
		const classes = cn(
			styles.root,
			styles[size],
			styles[color as keyof typeof styles],
			className
		);
		const status = useLoadImage(src);
		const imageLoadedNotFalling = src && status === 'loaded';

		const content = imageLoadedNotFalling ? (
			<Picture className={styles.avatar} src={src} alt={alt} />
		) : (
			children
		);

		return (
			<div className={classes} title={alt} ref={ref} {...props}>
				{content}
			</div>
		);
	})
);
