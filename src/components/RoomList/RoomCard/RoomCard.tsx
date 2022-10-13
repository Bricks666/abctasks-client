import * as React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useMutation } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { removeRoomMutation, Room } from '@/models/rooms';
import { Card } from '@/ui/Card';
import { CardHeader } from '@/ui/CardHeader';
import { List } from '@/ui/List';
import { ListItem } from '@/ui/ListItem';
import { EditMenu } from '@/components/EditMenu';
import { MenuOption } from '@/ui/MenuItem';
import { usePrepareLink } from '@/hooks';
import { GET_PARAMS, POPUPS } from '@/const';
import { Button } from '@/ui/Button';
import { CommonProps } from '@/types/common';

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
		addQuery: {
			[GET_PARAMS.popup]: POPUPS.updateRoom,
			[GET_PARAMS.roomId]: id,
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
				onClick: () => removeRoom.start(id),
			},
		],
		[updateLink, id]
	);
	return (
		<Card className={cn(styles.card, className)}>
			<CardHeader
				className={styles.header}
				secondaryAction={<EditMenu options={options} />}>
				{name}
			</CardHeader>
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
