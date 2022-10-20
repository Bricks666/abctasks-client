import * as React from 'react';
import { Skeleton, SxProps, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getRoomQuery } from '@/models/rooms';
import { usePrepareLink, useImminentlyQuery } from '@/hooks';
import { GET_PARAMS, POPUPS } from '@/const';
import { EditMenu } from '../EditMenu';
import { MenuOption } from '@/ui/MenuItem';
import { CommonProps } from '@/types/common';
import { StyledWrapper } from './styled';

const titleSx: SxProps = {
	fontWeight: 700,
};

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
		<StyledWrapper className={className}>
			<Typography variant='h4' component='h1' sx={titleSx}>
				{isLoading ? <Skeleton width='15em' /> : room?.name}
			</Typography>
			<EditMenu options={options} alt='Open room edit menu' />
		</StyledWrapper>
	);
};
