import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { IconButton } from '@mui/material';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { getParams, popupsMap, routes } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

export interface OpenAddUserIntoRoomPopupProps extends CommonProps {}

export const OpenAddUserIntoRoomPopup: React.FC<OpenAddUserIntoRoomPopupProps> =
	React.memo(() => {
		const params = useUnit(routes.room.users.$params);
		return (
			<IconButton
				to={routes.room.users as any}
				params={params}
				query={{
					[getParams.popup]: popupsMap.addUser,
				}}
				color='primary'
				component={Link}>
				<PersonAddAlt1Icon />
			</IconButton>
		);
	});
