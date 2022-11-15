import * as React from 'react';
import cn from 'classnames';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { roomsRoute } from '@/routes';
import { getParams, popups } from '@/const';
import { CommonProps } from '@/types';
import { EditMenu, MenuOption } from '@/shared/components';

import styles from './RoomsHeader.module.css';

export const RoomsHeader: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('rooms');

	const options = React.useMemo<MenuOption<any>[]>(
		() => [
			{
				label: 'Create room',
				to: roomsRoute,
				params: {},
				query: {
					[getParams.popup]: popups.createRoom,
				},
			},
		],
		[]
	);
	return (
		<header className={cn(styles.header, className)}>
			<Typography variant='h4' component='h1'>
				{t('title')}
			</Typography>
			<EditMenu options={options} />
		</header>
	);
};
