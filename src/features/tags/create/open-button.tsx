import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { open } from './model';

export interface OpenCreateTagFormProps extends CommonProps {}

export const OpenCreateTagForm: React.FC<OpenCreateTagFormProps> = React.memo(
	(props) => {
		const { className, } = props;
		const onClick = useUnit(open);
		const { t, } = useTranslation('room-tags');

		const title = t('actions.create_tag.actions.open');

		return (
			<Tooltip title={title}>
				<IconButton className={className} onClick={onClick}>
					<AddIcon />
				</IconButton>
			</Tooltip>
		);
	}
);
