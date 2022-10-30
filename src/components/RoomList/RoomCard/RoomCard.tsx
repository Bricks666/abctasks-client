import * as React from 'react';
import cn from 'classnames';
import { Button, Card, CardHeader, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMutation } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { removeRoomMutation, Room } from '@/models/rooms';
import { usePrepareLink } from '@/hooks';
import { routes } from '@/const';
import { CommonProps } from '@/types';
import { EditMenu } from '@/ui/EditMenu';
import { MenuOption } from '@/ui/MenuItem';

import styles from './RoomCard.module.css';

export interface RoomCardProps extends CommonProps, Room {}

export const RoomCard: React.FC<RoomCardProps> = ({
	id,
	name,
	className,
	description,
}) => {
	const { t } = useTranslation('rooms');
	const removeRoom = useMutation(removeRoomMutation);
	const updateLink = usePrepareLink({
		query: {
			[routes.GET_PARAMS.popup]: routes.POPUPS.updateRoom,
			[routes.GET_PARAMS.roomId]: id,
		},
	});
	const options = React.useMemo<MenuOption[]>(
		() => [
			{
				label: t('actions.update', { ns: 'common' }),
				to: updateLink,
			},
			{
				label: t('actions.remove', { ns: 'common' }),
				onClick: () => removeRoom.start({ id }),
			},
		],
		[updateLink, id]
	);
	return (
		<Card className={cn(styles.card, className)}>
			<CardHeader
				className={styles.header}
				action={<EditMenu options={options} />}
				title={name}
			/>
			<List>
				<ListItem>
					{t('card.description')}: {description}
				</ListItem>
			</List>
			<Button component={Link} type='text' to={`${id}`}>
				Перейти
			</Button>
		</Card>
	);
};
