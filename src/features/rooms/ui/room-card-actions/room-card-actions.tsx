import { Button } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { routes } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

export interface RoomCardActionsProps extends CommonProps {
	readonly id: number;
}

export const RoomCardActions: React.FC<RoomCardActionsProps> = (props) => {
	const { id, className, } = props;
	return (
		<Button
			className={className}
			variant='text'
			to={routes.room as any}
			params={{ id, }}
			component={Link}>
			Перейти
		</Button>
	);
};
