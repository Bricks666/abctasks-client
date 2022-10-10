import * as React from 'react';
import classNames from 'classnames';
import { CommonProps } from '@/interfaces/common';

import PopupContentStyle from './PopupContent.module.css';

export const PopupContent: React.FC<React.PropsWithChildren<CommonProps>> = ({
	className,
	children,
}) => {
	return (
		<div className={classNames(PopupContentStyle.content, className)}>
			{children}
		</div>
	);
};
