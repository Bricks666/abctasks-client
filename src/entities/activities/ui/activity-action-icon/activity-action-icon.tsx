import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import styles from './activity-action-icon.module.css';

export interface ActivityActionIconProps extends CommonProps {
	readonly action: string;
}

const colorMap: Record<string, 'success' | 'error' | 'warning'> = {
	create: 'success',
	remove: 'error',
	update: 'warning',
};

const iconMap: Record<string, React.ReactNode> = {
	create: <AddIcon />,
	remove: <DeleteIcon />,
	update: <EditIcon />,
};

export const ActivityActionIcon: React.FC<ActivityActionIconProps> = React.memo(
	(props) => {
		const { action, className, } = props;
		const { t, } = useTranslation('activities');

		const label = t(`type.${action}`)!;

		return (
			<Avatar
				className={cn(styles.avatar, styles[colorMap[action]], className)}
				aria-label={label}
				alt={label}>
				{iconMap[action]}
			</Avatar>
		);
	}
);
