/* eslint-disable react/style-prop-object */
import * as React from 'react';
import classNames from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { Text } from '../Text';

import AlertTitleStyle from './AlertTitle.module.css';

export const AlertTitle: React.FC<React.PropsWithChildren<CommonProps>> = ({
	className,
	children,
}) => {
	return (
		<Text
			className={classNames(AlertTitleStyle.title, className)}
			component='p'
			variant='h6'>
			{children}
		</Text>
	);
};
