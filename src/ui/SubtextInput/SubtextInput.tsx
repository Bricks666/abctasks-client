import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types';
import { Text } from '../Text';

import styles from './SubtextInput.module.css';

export const SubtextInput: React.FC<React.PropsWithChildren<CommonProps>> = ({
	className,
	children,
}) => {
	return (
		<Text className={cn(styles.text, className)} component='span'>
			{children}
		</Text>
	);
};
