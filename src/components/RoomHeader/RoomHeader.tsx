import * as React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Block } from '@/ui/Block';
import { Text } from '@/ui/Text';
import { usePrepareLink } from '@/hooks';
import { GET_PARAMS, POPUPS } from '@/const';
import { EditMenu } from '../EditMenu';
import { MenuOption } from '@/ui/MenuItem';
import { useRoom } from './hooks';
import { CommonProps } from '@/interfaces/common';

import RoomHeaderStyle from './RoomHeader.module.css';

export const RoomHeader: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const groupsLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.groups,
		},
	});
	const options: MenuOption[] = [
		{
			label: t('menus.groups'),
			to: groupsLink,
		},
	];
	const { id: roomId } = useParams();
	const room = useRoom(roomId);
	return (
		<Block className={cn(RoomHeaderStyle.block, className)}>
			<Text className={RoomHeaderStyle.header} component='h2'>
				{room?.name}
			</Text>
			<EditMenu options={options} alt='Open room edit menu' />
		</Block>
	);
};
