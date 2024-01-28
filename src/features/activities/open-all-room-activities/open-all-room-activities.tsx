import { Button } from '@mui/material';
import { RouteInstance } from 'atomic-router';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

export const OpenAllRoomActivities: React.FC<CommonProps> = React.memo(
	(props) => {
		const { className, } = props;
		const { t, } = useTranslation('room-tasks');

		const roomId = useParam(routes.room.tasks, 'id');

		const text = t('blocks.last_activities.actions.open');

		return (
			<Button
				className={className}
				variant='text'
				to={routes.room.activities as RouteInstance<any>}
				params={{ id: roomId, }}
				component={Link}>
				{text}
			</Button>
		);
	}
);
