import * as React from 'react';
import cn from 'classnames';
import { Skeleton, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { getRoomQuery } from '@/models';
import { CommonProps } from '@/types';

import styles from './RoomHeader.module.css';

export const RoomHeader: React.FC<CommonProps> = (props) => {
	const { className } = props;
	const room = useUnit(getRoomQuery.$data);
	const isLoading = !room;

	return (
		<header className={cn(styles.header, className)}>
			<Typography className={styles.title} variant='h4' component='h1'>
				{isLoading ? <Skeleton width='15em' /> : room!.name}
			</Typography>
		</header>
	);
};
