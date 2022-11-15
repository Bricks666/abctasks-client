import * as React from 'react';
import cn from 'classnames';
import { SxProps, Typography } from '@mui/material';
import { CommonProps } from '@/types';
import { Group } from '@/models/groups';

import styles from './GroupLabel.module.css';

export interface GroupLabelProps
	extends CommonProps,
		Omit<Group, 'id' | 'roomId'> {}

export const GroupLabel: React.FC<GroupLabelProps> = React.memo(
	function GroupLabel(props) {
		const { className, mainColor, name, secondColor } = props;
		const sx: SxProps = {
			backgroundColor: secondColor,
			color: mainColor,
		};

		return (
			<Typography
				className={cn(styles.label, className)}
				variant='body2'
				sx={sx}>
				{name}
			</Typography>
		);
	}
);
