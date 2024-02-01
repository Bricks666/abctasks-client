import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Typography
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Room } from '@/shared/api';
import { stringToColor } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Scrollable } from '@/shared/ui';

import styles from './template-room-card.module.css';

export interface TemplateRoomCardProps extends CommonProps, Room {
	readonly menu: React.ReactElement | null;
	readonly actions: React.ReactElement | null;
}

export const TemplateRoomCard: React.FC<TemplateRoomCardProps> = (props) => {
	const { name, className, description, menu, actions, id, } = props;
	const { t, } = useTranslation('rooms');
	const descriptionText = t('card.description');

	const sx = {
		height: 100,
		background: stringToColor(''.padEnd(15, id.toString())),
	};

	return (
		<Card className={cn(styles.card, className)} component='li'>
			<CardMedia sx={sx} />
			<CardHeader className={styles.header} action={menu} title={name} />
			<Scrollable
				className={styles.content}
				direction='vertical'
				component={CardContent}>
				<Typography>
					{descriptionText}: {description}
				</Typography>
			</Scrollable>
			<CardActions className={styles.actions}>{actions}</CardActions>
		</Card>
	);
};
