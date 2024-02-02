import EditIcon from '@mui/icons-material/Edit';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';
import { MenuItem } from '@/shared/ui';

import { openPopup } from './model';

export interface OpenUpdateTaskFormMenuItemProps extends CommonProps {
	readonly taskId: number;
}

export const OpenUpdateTaskFormMenuItem: React.FC<OpenUpdateTaskFormMenuItemProps> =
	React.memo((props) => {
		const { className, taskId, } = props;
		const open = useUnit(openPopup);
		const { t, } = useTranslation('tasks');

		const onClick = () => {
			open(taskId);
		};

		const label = t('actions.update_task.actions.open');

		return (
			<MenuItem
				className={className}
				onClick={onClick}
				icon={<EditIcon />}
				label={label}
			/>
		);
	});
