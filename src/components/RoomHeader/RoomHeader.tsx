import * as React from 'react';
import { Skeleton, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { getRoomQuery } from '@/models/rooms';
import { routes } from '@/const';
import { roomRoute } from '@/routes';
import { useParam } from '@/hooks';
import { CommonProps } from '@/types';
import { EditMenu } from '@/ui/EditMenu';
import { MenuOption } from '@/ui/MenuItem';
import { StyledWrapper, titleSx } from './styled';

export const RoomHeader: React.FC<CommonProps> = (props) => {
	const { className } = props;
	const { t } = useTranslation('room');
	const roomId = useParam(roomRoute, 'id');
	const room = useUnit(getRoomQuery.$data);
	const options = React.useMemo<MenuOption<any>[]>(
		() => [
			{
				label: t('actions.groups'),
				to: roomRoute,
				params: { id: roomId },
				query: {
					[routes.GET_PARAMS.popup]: routes.POPUPS.groups,
				},
			},
		],
		[roomId]
	);
	const isLoading = !room;

	return (
		<StyledWrapper className={className}>
			<Typography variant='h4' component='h1' sx={titleSx}>
				{isLoading ? <Skeleton width='15em' /> : room!.name}
			</Typography>
			<EditMenu options={options} alt='Open room edit menu' />
		</StyledWrapper>
	);
};
