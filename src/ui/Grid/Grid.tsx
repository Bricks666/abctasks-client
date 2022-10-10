import * as React from 'react';
import classNames from 'classnames';
import { CommonProps } from '@/interfaces/common';

import GridStyle from './Grid.module.css';

export const Grid: React.FC<React.PropsWithChildren<CommonProps>> = React.memo(
	function Grid({ children, className }) {
		return (
			<div className={classNames(GridStyle.grid, className)}>{children}</div>
		);
	}
);
