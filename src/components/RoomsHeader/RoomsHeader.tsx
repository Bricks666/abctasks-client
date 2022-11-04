import * as React from 'react';
import cn from 'classnames';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EditMenu } from '@/ui/EditMenu';
import { MenuOption } from '@/ui/MenuItem';
import { usePrepareLink } from '@/hooks';
import { routes } from '@/const';
import { CommonProps } from '@/types';

import styles from './RoomsHeader.module.css';

export const RoomsHeader: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('rooms');
	const createLink = usePrepareLink({
		query: {
			[routes.GET_PARAMS.popup]: routes.POPUPS.createRoom,
		},
	});
	const options = React.useMemo<MenuOption[]>(
		() => [
			{
				label: 'Create room',
				to: createLink,
			},
		],
		[createLink]
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
