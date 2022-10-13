import * as React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getRoomQuery } from '@/models/rooms';
import { Block } from '@/ui/Block';
import { Text } from '@/ui/Text';
import { usePrepareLink, useImminentlyQuery } from '@/hooks';
import { GET_PARAMS, POPUPS } from '@/const';
import { EditMenu } from '../EditMenu';
import { MenuOption } from '@/ui/MenuItem';
import { CommonProps } from '@/types/common';
import { LoadingIndicator } from '@/ui/LoadingIndicator';

import styles from './RoomHeader.module.css';

export const RoomHeader: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const { id: roomId } = useParams();
	const { data: room, pending } = useImminentlyQuery(
		getRoomQuery,
		Number(roomId),
		roomId
	);
	const groupsLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.groups,
		},
	});
	const options: MenuOption[] = [
		{
			label: t('actions.groups'),
			to: groupsLink,
		},
	];
	const isLoading = !room || pending;

	return (
		<Block className={cn(styles.block, className)}>
			{isLoading ? (
				<LoadingIndicator size='small' />
			) : (
				<Text className={styles.header} component='h2'>
					{room?.name}
				</Text>
			)}
			<EditMenu options={options} alt='Open room edit menu' />
		</Block>
	);
};
