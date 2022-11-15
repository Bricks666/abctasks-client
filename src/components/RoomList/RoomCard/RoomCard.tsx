import * as React from 'react';
import cn from 'classnames';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography,
} from '@mui/material';
import { Link } from 'atomic-router-react';
import { useMutation } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { removeRoomMutation, Room } from '@/models/rooms';
import { roomRoute, roomsRoute } from '@/routes';
import { CommonProps } from '@/types';
import { EditMenu } from '@/ui/EditMenu';
import { MenuOption } from '@/ui/MenuItem';

import styles from './RoomCard.module.css';
import { routes } from '@/const';

export interface RoomCardProps extends CommonProps, Room {}

export const RoomCard: React.FC<RoomCardProps> = ({
	id,
	name,
	className,
	description,
}) => {
	const { t } = useTranslation('rooms');
	const removeRoom = useMutation(removeRoomMutation);
	const options = React.useMemo<MenuOption<object>[]>(
		() => [
			{
				label: t('actions.update', { ns: 'common' }),
				to: roomsRoute,
				params: {},
				query: {
					[routes.GET_PARAMS.popup]: routes.POPUPS.updateRoom,
					[routes.GET_PARAMS.roomId]: id,
				},
			},
			{
				label: t('actions.remove', { ns: 'common' }),
				onClick: () => removeRoom.start({ id }),
			},
		],
		[id]
	);
	return (
		<Card className={cn(styles.card, className)}>
			<CardHeader
				className={styles.header}
				action={<EditMenu options={options} />}
				title={name}
			/>
			<CardContent className={styles.content}>
				<Typography>
					{t('card.description')}: {description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button variant='text' to={roomRoute} params={{ id }} component={Link}>
					Перейти
				</Button>
			</CardActions>
		</Card>
	);
};
