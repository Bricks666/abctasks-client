import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types/common';
import { Text } from '../Text';
import { Group as GroupModel } from '@/models/groups/types';

import styles from './Group.module.css';

export interface GroupProps
	extends CommonProps,
		Omit<GroupModel, 'id' | 'roomId'> {}

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
