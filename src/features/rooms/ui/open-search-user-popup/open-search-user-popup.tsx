import { Button } from '@mui/material';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { getParams, popups, routes } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

export interface OpenSearchUserPopupProps extends CommonProps {}

export const OpenSearchUserPopup: React.FC<OpenSearchUserPopupProps> =
	React.memo(() => {
		const params = useUnit(routes.room.users.$params);
		return (
			<Button
				to={routes.room.users as any}
				params={params}
				query={{
					[getParams.popup]: popups.addUser,
				}}
				component={Link}>
				Add into room
			</Button>
		);
	});
