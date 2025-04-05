import { Button } from '@mui/material';
import * as React from 'react';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

export interface OpenAllRoomActivitiesProps extends CommonProps {
	readonly roomId: number;
}

export const OpenAllRoomActivities: FC<OpenAllRoomActivitiesProps> = memo(
	(props) => {
		const { className, roomId, } = props;
		const { t, } = useTranslation('room-tasks');

		const textT = t('blocks.last_activities.actions.open');

		return (
			<Button
				className={className}
				href={ROUTES.room.activities.getPath({ id: roomId.toString(), })}
				variant='text'
				component='a'>
				{textT}
			</Button>
		);
	}
);
