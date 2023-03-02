import { SxProps, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { Tag } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import styles from './tag-label.module.css';

export interface TagProps extends CommonProps, Omit<Tag, 'id' | 'roomId'> {}

export const TagLabel: React.FC<TagProps> = React.memo(function TagLabel(
	props
) {
	const { className, mainColor, name, secondColor, } = props;
	const sx: SxProps = {
		backgroundColor: secondColor,
		color: mainColor,
	};

	return (
		<Typography className={cn(styles.label, className)} variant='body2' sx={sx}>
			{name}
		</Typography>
	);
});
