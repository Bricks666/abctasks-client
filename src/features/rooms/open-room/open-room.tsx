import { Button } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { roomModel } from '@/entities/rooms';

import { CommonProps } from '@/shared/types';

export interface OpenRoomProps extends CommonProps {
	readonly id: number;
}

export const OpenRoom: React.FC<OpenRoomProps> = (props) => {
	const { id, className, } = props;
	const { t, } = useTranslation('common');

	const openRoom = useUnit(roomModel.openRoomPage);

	const onClick = () => {
		openRoom({ roomId: id, });
	};

	const nameText = t('actions.open');

	return (
		<Button
			className={className}
			onClick={onClick}
			variant='contained'
			disableElevation>
			{nameText}
		</Button>
	);
};
