import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RoomsHeaderMenu } from '@/features/rooms';
import { CommonProps } from '@/shared/types';

import styles from './rooms-header.module.css';

export const RoomsHeader: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('rooms');
	return (
		<header className={cn(styles.header, className)}>
			<Typography variant='h4' component='h1'>
				{t('title')}
			</Typography>
			<RoomsHeaderMenu />
		</header>
	);
};
