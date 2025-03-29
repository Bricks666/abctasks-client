import { SxProps, Typography } from '@mui/material';
import cn from 'classnames';
import { ComponentProps, FC, memo } from 'react';

import { CommonProps } from '@/shared/types';

import { Tag } from '../../models';

import styles from './styles.module.css';

export interface TagLabelProps
	extends CommonProps,
		Pick<Tag, 'mainColor' | 'secondColor' | 'name'>,
		Omit<ComponentProps<'span'>, 'color' | 'backgroundColor' | 'id'> {}

export const TagLabel: FC<TagLabelProps> = memo((props) => {
	const { className, mainColor, name, secondColor, ...rest } = props;

	const sx: SxProps = {
		backgroundColor: secondColor,
		color: mainColor,
	};

	return (
		<Typography
			className={cn(styles.label, className)}
			variant='body2'
			component='span'
			sx={sx}
			{...rest}>
			{name}
		</Typography>
	);
});
