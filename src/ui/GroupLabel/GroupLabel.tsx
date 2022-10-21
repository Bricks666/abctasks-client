import * as React from 'react';
import { CommonProps } from '@/types/common';
import { Group } from '@/models/groups';
import { StyledTitle } from './styles';

export interface GroupLabelProps
	extends CommonProps,
		Omit<Group, 'id' | 'roomId'> {}

export const GroupLabel: React.FC<GroupLabelProps> = React.memo(
	function GroupLabel({
		className,
		mainColor,
		name,
		secondColor,
	}: GroupLabelProps) {
		return (
			<StyledTitle
				className={className}
				mainColor={mainColor}
				secondColor={secondColor}
				variant='body2'>
				{name}
			</StyledTitle>
		);
	}
);
