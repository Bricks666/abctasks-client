import { Skeleton, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useRoom } from '@/entities/rooms';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

import styles from './room-header.module.css';

export const RoomHeader: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const id = useParam(routes.room, 'id');
	const { data: room, } = useRoom(id);
	const isLoading = !room;

	return (
		<header className={cn(styles.header, className)}>
			<Typography className={styles.title} variant='h4' component='h1'>
				{isLoading ? <Skeleton width='15em' /> : room.name}
			</Typography>
		</header>
	);
};
