import * as React from 'react';
import classNames from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { Text } from '../Text';
import { TaskGroup } from '@/models/Groups/types';

import GroupStyle from './Group.module.css';

export interface GroupProps extends CommonProps, TaskGroup {}

export const Group: React.FC<GroupProps> = React.memo(function Group({
	className,
	mainColor,
	name,
	secondColor,
}: GroupProps) {
	const groupStyle: React.CSSProperties = {
		backgroundColor: secondColor,
		color: mainColor,
	};
	return (
		<Text
			className={classNames(GroupStyle.group, className)}
			cssStyles={groupStyle}
			component='span'>
			{name}
		</Text>
	);
});
