import * as React from 'react';
import { Skeleton, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { getRoomQuery } from '@/models';
import { CommonProps } from '@/types';
import { StyledWrapper, titleSx } from './styled';

export const RoomHeader: React.FC<CommonProps> = (props) => {
	const { className } = props;
	const room = useUnit(getRoomQuery.$data);
	const isLoading = !room;

	return (
		<StyledWrapper className={className}>
			<Typography variant='h4' component='h1' sx={titleSx}>
				{isLoading ? <Skeleton width='15em' /> : room!.name}
			</Typography>
		</StyledWrapper>
	);
};
