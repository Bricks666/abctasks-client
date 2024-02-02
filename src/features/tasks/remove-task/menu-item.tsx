import DeleteIcon from '@mui/icons-material/Delete';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';
import { MenuItem } from '@/shared/ui';

import { openConfirm } from './model';

export interface RemoveTaskMenuItemProps extends CommonProps {
	readonly roomId: number;
	readonly taskId: number;
}

export const RemoveTaskMenuItem: React.FC<RemoveTaskMenuItemProps> = React.memo(
	(props) => {
		const { className, taskId, } = props;
		const { t, } = useTranslation('tasks');
		const open = useUnit(openConfirm);

		const label = t('actions.remove_task.name');

		const onClick = () => {
			open(taskId);
		};

		return (
			<MenuItem
				className={className}
				onClick={onClick}
				label={label}
				icon={<DeleteIcon />}
			/>
		);
	}
);
