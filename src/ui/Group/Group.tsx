import * as React from 'react';
import { CommonProps } from '@/types/common';
import { Group as GroupModel } from '@/models/groups';
import { StyledTitle } from './styles';

export interface GroupProps
	extends CommonProps,
		Omit<GroupModel, 'id' | 'roomId'> {}

export const Group: React.FC<GroupProps> = React.memo(function Group({
	className,
	mainColor,
	name,
	secondColor,
}: GroupProps) {
	return (
		<StyledTitle
			className={className}
			mainColor={mainColor}
			secondColor={secondColor}
			variant='body2'>
			{name}
		</StyledTitle>
	);
});
