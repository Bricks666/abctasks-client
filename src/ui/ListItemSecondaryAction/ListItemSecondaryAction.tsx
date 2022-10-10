import * as React from 'react';
import classNames from 'classnames';
import { CommonProps } from '@/interfaces/common';

import ListItemSecondaryActionStyle from './ListItemSecondaryAction.module.css';

export const ListItemSecondaryAction: React.FC<
	React.PropsWithChildren<CommonProps>
> = ({ children, className }) => {
	return (
		<div className={classNames(ListItemSecondaryActionStyle.item, className)}>
			{children}
		</div>
	);
};
