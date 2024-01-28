import EditIcon from '@mui/icons-material/Edit';
import { Tooltip, IconButton } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { openPopup } from './model';

export interface OpenUpdateTagButtonProps extends CommonProps {
	readonly tagId: number;
}

export const OpenUpdateTagButton: React.FC<OpenUpdateTagButtonProps> = (
	props
) => {
	const { tagId, className, } = props;

	const open = useUnit(openPopup);

	const { t, } = useTranslation('room-tags');

	const onClick = () => {
		open(tagId);
	};

	const updateTitle = t('actions.update_tag.actions.open');

	return (
		<Tooltip title={updateTitle}>
			<IconButton className={className} onClick={onClick}>
				<EditIcon />
			</IconButton>
		</Tooltip>
	);
};
