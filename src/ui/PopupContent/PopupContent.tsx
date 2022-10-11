import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import styles from './PopupContent.module.css';

export const PopupContent: React.FC<React.PropsWithChildren<CommonProps>> = ({
	className,
	children,
}) => {
	return <div className={cn(styles.content, className)}>{children}</div>;
};
