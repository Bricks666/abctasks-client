import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/interfaces/common';

import PictureStyle from './Picture.module.css';

export interface PictureProps
	extends CommonProps,
		Readonly<React.ImgHTMLAttributes<HTMLImageElement>> {
	readonly alt: string;
	readonly src: string;
}

export const Picture: React.FC<PictureProps> = React.memo(function Picture({
	className,
	alt,
	src,
	...props
}) {
	return (
		<img
			className={cn(PictureStyle.picture, className)}
			src={src}
			alt={alt}
			{...props}
		/>
	);
});
