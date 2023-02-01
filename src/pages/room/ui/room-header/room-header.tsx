import { Skeleton, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { Header } from '@/widgets/page';
import { useRoom } from '@/entities/rooms';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Tabs } from '../tabs';

import styles from './room-header.module.css';

export const RoomHeader: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const id = useParam(routes.room.base, 'id');
	const { data: room, pending, } = useRoom(id);

	return (
		<Header
			className={cn(className)}
			leftContent={
				<div>
					<Typography className={styles.title} variant='h6' component='h1'>
						{pending ? <Skeleton width='15em' /> : room?.name}
					</Typography>
					<Typography variant='body2'>
						{pending ? <Skeleton width='15em' /> : room?.description}
					</Typography>
				</div>
			}
			centerContent={<Tabs />}
		/>
	);
};
