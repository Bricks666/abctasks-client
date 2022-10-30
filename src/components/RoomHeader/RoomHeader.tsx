import * as React from 'react';
import { Skeleton, Typography } from '@mui/material';
import { useQuery } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { getRoomQuery } from '@/models/rooms';
import { usePrepareLink } from '@/hooks';
import { routes } from '@/const';
import { EditMenu } from '@/ui/EditMenu';
import { MenuOption } from '@/ui/MenuItem';
import { CommonProps } from '@/types';
import { StyledWrapper, titleSx } from './styled';

export const RoomHeader: React.FC<CommonProps> = (props) => {
	const { className } = props;
	const { t } = useTranslation('room');
	const { data: room } = useQuery(getRoomQuery);
	const groupsLink = usePrepareLink({
		query: {
			[routes.GET_PARAMS.popup]: routes.POPUPS.groups,
		},
	});
	const options: MenuOption[] = [
		{
			label: t('actions.groups'),
			to: groupsLink,
		},
	];
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
