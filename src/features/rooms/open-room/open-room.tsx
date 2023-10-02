import { Button } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';

import { routes } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

export interface OpenRoomProps extends CommonProps {
	readonly id: number;
}

export const OpenRoom: React.FC<OpenRoomProps> = (props) => {
	const { id, className, } = props;
	return (
		<Button
			className={className}
			variant='contained'
			to={routes.room.tasks as any}
			params={{ id, }}
			component={Link}
			disableElevation>
			Открыть
		</Button>
	);
};
