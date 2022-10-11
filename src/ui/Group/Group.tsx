import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { Text } from '../Text';
import { TaskGroup } from '@/models/Groups/types';

import styles from './Group.module.css';

export interface GroupProps extends CommonProps, TaskGroup {}

export const Group: React.FC<GroupProps> = React.memo(function Group({
	className,
	mainColor,
	name,
	secondColor,
}: GroupProps) {
	const CSSstyles: React.CSSProperties = {
		backgroundColor: secondColor,
		color: mainColor,
	};
	return (
		<Text
			className={cn(styles.group, className)}
			cssStyles={CSSstyles}
			component='span'>
			{name}
		</Text>
	);
});
