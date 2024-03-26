import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { MainHeader } from '@/widgets/page';

import { OpenCreateRoom } from '@/features/rooms';

import { CommonProps } from '@/shared/types';

import styles from './rooms-header.module.css';

export const RoomsHeader: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('rooms');
	const title = t('title');

	return (
		<MainHeader
			className={cn(styles.bar, className)}
			slots={{
				left: (
					<Typography className={styles.title} variant='h5' component='h1'>
						{title}
					</Typography>
				),
				right: <OpenCreateRoom />,
			}}
		/>
	);
};
