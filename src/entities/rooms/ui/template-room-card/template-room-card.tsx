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

import styles from './template-room-card.module.css';

export interface TemplateRoomCardProps extends CommonProps, Room {
	readonly menu: React.ReactElement | null;
	readonly actions: React.ReactElement | null;
}

export const TemplateRoomCard: React.FC<TemplateRoomCardProps> = (props) => {
	const { name, className, description, menu, actions, id, } = props;
	const { t, } = useTranslation('template-room-card');
	const descriptionText = t('description');

	const sx = {
		height: 100,
		background: stringToColor(''.padEnd(15, id.toString())),
	};

	return (
		<Card className={cn(styles.card, className)}>
			<CardMedia sx={sx} />
			<CardHeader className={styles.header} action={menu} title={name} />
			<CardContent className={styles.content}>
				<Typography>
					{descriptionText}: {description}
				</Typography>
			</CardContent>
			<CardActions className={styles.actions}>{actions}</CardActions>
		</Card>
	);
};
