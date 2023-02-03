import { Typography } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { AddUserButton } from '@/features/rooms';
import { usersInRoomModel } from '@/entities/users';
import { CommonProps } from '@/shared/types';

import styles from './users-header.module.css';

export interface UsersHeaderProps extends CommonProps {}

export const UsersHeader: React.FC<UsersHeaderProps> = (props) => {
	const { className, } = props;

	const count = useUnit(usersInRoomModel.$count);

	return (
		<header className={cn(styles.wrapper, className)}>
			<div className={styles.text}>
				<Typography variant='h5' component='h3' fontWeight={700}>
					Users
				</Typography>
				<Typography>{count} count</Typography>
			</div>
			<AddUserButton />
		</header>
	);
};
