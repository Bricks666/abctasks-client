import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Room } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import styles from './template-room-card.module.css';

export interface TemplateRoomCardProps extends CommonProps, Room {
	readonly menu: React.ReactElement | null;
	readonly actions: React.ReactElement | null;
}

export const TemplateRoomCard: React.FC<TemplateRoomCardProps> = (props) => {
	const { name, className, description, menu, actions, } = props;
	const { t, } = useTranslation('rooms');

	return (
		<Card className={cn(styles.card, className)}>
			<CardHeader className={styles.header} action={menu} title={name} />
			<CardContent className={styles.content}>
				<Typography>
					{t('card.description')}: {description}
				</Typography>
			</CardContent>
			<CardActions>{actions}</CardActions>
		</Card>
	);
};
