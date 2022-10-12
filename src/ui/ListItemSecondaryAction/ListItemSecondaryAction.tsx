import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types/common';

import styles from './ListItemSecondaryAction.module.css';

export const ListItemSecondaryAction: React.FC<
	React.PropsWithChildren<CommonProps>
> = ({ children, className }) => {
	return <div className={cn(styles.item, className)}>{children}</div>;
};
