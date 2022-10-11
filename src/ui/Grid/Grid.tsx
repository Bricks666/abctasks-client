import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import styles from './Grid.module.css';

export const Grid: React.FC<React.PropsWithChildren<CommonProps>> = React.memo(
	function Grid({ children, className }) {
		return <div className={cn(styles.grid, className)}>{children}</div>;
	}
);
