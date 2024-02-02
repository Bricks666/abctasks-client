import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { openConfirm } from './model';

export interface RemoveTagProps extends CommonProps {
	readonly tagId: number;
}

export const RemoveTag: React.FC<RemoveTagProps> = (props) => {
	const { className, tagId, } = props;

	const open = useUnit(openConfirm);
	const { t, } = useTranslation('room-tags');

	const openText = t('actions.remove_tag.actions.open');

	const onClick = () => {
		open(tagId);
	};

	return (
		<Tooltip title={openText}>
			<IconButton className={className} onClick={onClick}>
				<DeleteIcon />
			</IconButton>
		</Tooltip>
	);
};
