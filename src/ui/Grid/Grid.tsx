import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import GridStyle from './Grid.module.css';

export const Grid: React.FC<React.PropsWithChildren<CommonProps>> = React.memo(
	function Grid({ children, className }) {
		return <div className={cn(GridStyle.grid, className)}>{children}</div>;
	}
);
