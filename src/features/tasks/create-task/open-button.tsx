import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { TaskStatus } from '@/shared/api';
import { CommonProps } from '@/shared/types';

import { openPopup } from './model';

export interface OpenCreateTaskButtonProps extends CommonProps {
	readonly columnStatus: TaskStatus;
}

export const OpenCreateTaskButton: React.FC<OpenCreateTaskButtonProps> =
	React.memo((props) => {
		const { className, columnStatus, } = props;
		const open = useUnit(openPopup);
		const { t, } = useTranslation('tasks');
		const label = t('actions.create_task.actions.open');

		const onClick = () => {
			open(columnStatus);
		};

		return (
			<Tooltip title={label}>
				<IconButton className={className} onClick={onClick}>
					<AddIcon />
				</IconButton>
			</Tooltip>
		);
	});
