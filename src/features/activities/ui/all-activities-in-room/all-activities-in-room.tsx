import { Link as MUILink } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

export const AllActivitiesInRoom: React.FC<CommonProps> = React.memo(
	(props) => {
		const { className, } = props;
		const id = useParam(routes.room, 'id');

		return (
			<MUILink
				className={className}
				to={routes.room as any}
				params={{ id, tab: 'activities', }}
				component={Link}>
				Посмотреть все
			</MUILink>
		);
	}
);
