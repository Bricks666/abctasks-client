import * as React from 'react';
import classNames from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { Text } from '../Text';

import SubtextInputStyle from './SubtextInput.module.css';

export const SubtextInput: React.FC<React.PropsWithChildren<CommonProps>> = ({
	className,
	children,
}) => {
	return (
		<Text
			className={classNames(SubtextInputStyle.text, className)}
			component='span'>
			{children}
		</Text>
	);
};
