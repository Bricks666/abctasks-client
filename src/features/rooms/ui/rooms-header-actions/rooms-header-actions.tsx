import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { routes, getParams, popupsMap } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

export interface RoomsHeaderActionsProps extends CommonProps {}

export const RoomsHeaderActions: React.FC<RoomsHeaderActionsProps> = (
	props
) => {
	const { className, } = props;

	return (
		<IconButton
			className={className}
			to={routes.rooms}
			params={{}}
			query={{ [getParams.popup]: popupsMap.createRoom, }}
			component={Link}>
			<AddIcon />
		</IconButton>
	);
};
