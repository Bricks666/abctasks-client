import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import ContentLayoutStyle from './ContentLayout.module.css';

export const ContentLayout: React.FC<React.PropsWithChildren<CommonProps>> = ({
	children,
	className,
}) => {
	return (
		<div className={cn(ContentLayoutStyle.contentLayout, className)}>
			{children}
		</div>
	);
};
