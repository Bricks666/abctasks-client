import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar } from '@mui/material';
import cn from 'classnames';
import { type FC, memo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import styles from './styles.module.css';

export interface ActivityActionIconProps extends CommonProps {
	readonly action: string;
}

const colorMap: Record<string, 'success' | 'error' | 'warning'> = {
	create: 'success',
	remove: 'error',
	update: 'warning',
};

const iconMap: Record<string, ReactNode> = {
	create: <AddIcon />,
	remove: <DeleteIcon />,
	update: <EditIcon />,
};

export const ActivityActionIcon: FC<ActivityActionIconProps> = memo((props) => {
	const { action, className, } = props;
	const { t, } = useTranslation('activities');

	const labelT = t(`type.${action}`)!;

	const icon = iconMap[action];

	return (
		<Avatar
			className={cn(styles.avatar, styles[colorMap[action]], className)}
			aria-label={labelT}
			alt={labelT}>
			{icon}
		</Avatar>
	);
});
