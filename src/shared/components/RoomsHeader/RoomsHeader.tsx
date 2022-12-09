import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { getParams, popups } from '@/shared/const';
import { EditMenu, MenuOption } from '@/shared/ui';

import styles from './RoomsHeader.module.css';
import { roomsRoute } from '@/routes';
import { CommonProps } from '@/types';

export const RoomsHeader: React.FC<CommonProps> = ({ className, }) => {
	const { t, } = useTranslation('rooms');

	const options = React.useMemo<MenuOption<any>[]>(
		() => [
			{
				label: t('actions.create', { ns: 'common', }),
				to: roomsRoute,
				params: {},
				query: {
					[getParams.popup]: popups.createRoom,
				},
			}
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
