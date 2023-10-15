import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { IconButton, Tooltip } from '@mui/material';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { getParams, popupsMap, routes } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

export interface AddUserButtonProps extends CommonProps {}

export const AddUserButton: React.FC<AddUserButtonProps> = React.memo(() => {
	const params = useUnit(routes.room.users.$params);
	return (
		<Tooltip title='Добавить пользователя'>
			<IconButton
				to={routes.room.users as any}
				params={params}
				query={{
					[getParams.popup]: popupsMap.addUser,
				}}
				component={Link}>
				<PersonAddAlt1Icon />
			</IconButton>
		</Tooltip>
	);
});
