import { Skeleton, Typography } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import styles from './RoomHeader.module.css';
import { getRoomQuery } from '@/models';
import { CommonProps } from '@/types';

export const RoomHeader: React.FC<CommonProps> = (props) => {
	const { className, } = props;
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
