import { useMutation } from '@farfetched/react';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography
} from '@mui/material';
import { Link } from 'atomic-router-react';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { getParams, popups } from '@/shared/const';
import { EditMenu, MenuOption } from '@/shared/ui';
import styles from './RoomCard.module.css';
import { removeRoomMutation, Room } from '@/models';
import { roomRoute, roomsRoute } from '@/routes';
import { CommonProps } from '@/types';

export interface RoomCardProps extends CommonProps, Room {}

export const RoomCard: React.FC<RoomCardProps> = ({
	id,
	name,
	className,
	description,
}) => {
	const { t, } = useTranslation('rooms');
	const removeRoom = useMutation(removeRoomMutation);
	const options = React.useMemo<MenuOption<object>[]>(
		() => [
			{
				label: t('actions.update', { ns: 'common', }),
				to: roomsRoute,
				params: {},
				query: {
					[getParams.popup]: popups.updateRoom,
					[getParams.roomId]: id,
				},
			},
			{
				label: t('actions.remove', { ns: 'common', }),
				onClick: () => removeRoom.start({ id, }),
			}
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
				<Button
					variant='text'
					to={roomRoute as any}
					params={{ id, }}
					component={Link}>
					Перейти
				</Button>
			</CardActions>
		</Card>
	);
};
