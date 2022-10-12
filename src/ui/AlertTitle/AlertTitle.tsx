/* eslint-disable react/style-prop-object */
import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types/common';
import { Text } from '../Text';

import styles from './AlertTitle.module.css';

export const AlertTitle: React.FC<React.PropsWithChildren<CommonProps>> = ({
	className,
	children,
}) => {
	return (
		<Text className={cn(styles.title, className)} component='p' variant='h6'>
			{children}
		</Text>
	);
};
