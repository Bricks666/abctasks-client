import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types/common';

import styles from './ContentLayout.module.css';

export const ContentLayout: React.FC<React.PropsWithChildren<CommonProps>> = ({
	children,
	className,
}) => {
	return <div className={cn(styles.contentLayout, className)}>{children}</div>;
};
