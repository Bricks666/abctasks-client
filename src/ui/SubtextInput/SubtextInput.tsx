import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { Text } from '../Text';

import SubtextInputStyle from './SubtextInput.module.css';

export const SubtextInput: React.FC<React.PropsWithChildren<CommonProps>> = ({
	className,
	children,
}) => {
	return (
		<Text className={cn(SubtextInputStyle.text, className)} component='span'>
			{children}
		</Text>
	);
};
