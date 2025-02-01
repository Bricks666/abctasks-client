import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	CardProps,
	Typography
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { stringToColor } from '@/shared/lib';
import { CommonProps, Slots } from '@/shared/types';

import { Room } from '../../models';

import styles from './styles.module.css';

type RoomCardSlots = 'header-action' | 'footer-actions';

export interface RoomCardTemplateProps extends CommonProps, CardProps<'li'> {
	readonly room: Room;
	readonly slots?: Slots<RoomCardSlots>;
}

export const RoomCardTemplate: React.FC<RoomCardTemplateProps> = (props) => {
	const { className, room, slots = {}, ...rest } = props;

	const { t, } = useTranslation('rooms');
	const descriptionT = t('card.description');

	const sx = {
		height: 100,
		background: stringToColor(''.padEnd(15, room.id.toString())),
	};

	return (
		<Card className={cn(styles.card, className)} component='li' {...rest}>
			<CardMedia sx={sx} />
			<CardHeader
				className={styles.header}
				action={slots['header-action']}
				title={room.name}
			/>
			<CardContent className={styles.content}>
				<Typography>
					{descriptionT}: {room.description}
				</Typography>
			</CardContent>
			<CardActions className={styles.actions}>
				{slots['footer-actions']}
			</CardActions>
		</Card>
	);
};
