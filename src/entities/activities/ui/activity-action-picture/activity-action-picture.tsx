import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { ActivityAction } from '@/shared/api';
import { CommonProps } from '@/shared/types';

import styles from './activity-action-picture.module.css';

export interface ActivityActionPictureProps
	extends CommonProps,
		ActivityAction {}

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

export const ActivityActionPicture: React.FC<ActivityActionPictureProps> =
	React.memo((props) => {
		const { name, className, } = props;
		const { t, } = useTranslation('activities');

		const label = t(`type.${name}`)!;

		return (
			<Avatar
				className={cn(styles.avatar, styles[colorMap[name]], className)}
				aria-label={label}
				alt={label}>
				{iconMap[name]}
			</Avatar>
		);
	});
