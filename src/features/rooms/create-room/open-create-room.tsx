import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import { popupControls } from './model';

export interface OpenCreateRoomProps extends CommonProps {}

export const OpenCreateRoom: React.FC<OpenCreateRoomProps> = (props) => {
	const { className, } = props;

	const onClick = useUnit(popupControls.open);

	return (
		<IconButton className={className} onClick={onClick}>
			<AddIcon />
		</IconButton>
	);
};
