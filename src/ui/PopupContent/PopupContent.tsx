import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import PopupContentStyle from './PopupContent.module.css';

export const PopupContent: React.FC<React.PropsWithChildren<CommonProps>> = ({
	className,
	children,
}) => {
	return (
		<div className={cn(PopupContentStyle.content, className)}>{children}</div>
	);
};
