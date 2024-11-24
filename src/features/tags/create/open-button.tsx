import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { popupControls } from './model';

export interface OpenCreateTagButtonProps extends CommonProps {}

export const OpenCreateTagButton: React.FC<OpenCreateTagButtonProps> =
	React.memo((props) => {
		const { className, } = props;
		const onClick = useUnit(popupControls.open);
		const { t, } = useTranslation('room-tags');

		const title = t('actions.create_tag.actions.open');

		return (
			<Tooltip title={title}>
				<IconButton className={className} onClick={onClick}>
					<AddIcon />
				</IconButton>
			</Tooltip>
		);
	});
