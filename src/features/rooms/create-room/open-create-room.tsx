import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { popupControls } from './model';

export interface OpenCreateRoomProps extends CommonProps {}

export const OpenCreateRoom: React.FC<OpenCreateRoomProps> = (props) => {
	const { className, } = props;

	const onClick = useUnit(popupControls.open);
	const { t, } = useTranslation('rooms');

	const label = t('actions.create_room.actions.open');

	return (
		<IconButton className={className} onClick={onClick} aria-label={label}>
			<AddIcon />
		</IconButton>
	);
};
