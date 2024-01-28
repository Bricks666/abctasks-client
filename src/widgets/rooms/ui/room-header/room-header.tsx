import { Skeleton, Typography } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { MainHeader } from '@/widgets/page';

import { roomModel } from '@/entities/rooms';

import { CommonProps } from '@/shared/types';

import { Tabs } from '../tabs';

import styles from './room-header.module.css';

export const RoomHeader: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { data: room, pending, } = useUnit(roomModel.query);

	const firstLoading = !room && pending;

	return (
		<MainHeader
			className={cn(className)}
			slots={{
				left: (
					<div>
						<Typography variant='h6' component='h1'>
							{firstLoading ? (
								<Skeleton className={styles.titleSkeleton} width='10em' />
							) : (
								room?.name
							)}
						</Typography>
						<Typography className={styles.description} variant='body2'>
							{firstLoading ? <Skeleton width='10em' /> : room?.description}
						</Typography>
					</div>
				),
				center: <Tabs />,
			}}
		/>
	);
};
