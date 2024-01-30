import { Button } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { openAllActivities } from './model';

export const OpenAllRoomActivities: React.FC<CommonProps> = React.memo(
	(props) => {
		const { className, } = props;
		const onClick = useUnit(openAllActivities);
		const { t, } = useTranslation('room-tasks');

		const text = t('blocks.last_activities.actions.open');

		return (
			<Button className={className} onClick={onClick} variant='text'>
				{text}
			</Button>
		);
	}
);
