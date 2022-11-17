import * as React from 'react';
import cn from 'classnames';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { Activity, ActivityType } from '@/models';
import { Color, CommonProps } from '@/types';
import { DateTime } from '@/shared/components';

import styles from './ActivityCard.module.css';

export interface ActivityCardProps extends CommonProps, Activity {}

const colorMap: Record<
	ActivityType,
	Exclude<Color, 'primary' | 'secondary' | 'dark'>
> = {
	create: 'success',
	remove: 'error',
	update: 'warning',
};

const iconMap: Record<ActivityType, React.ReactNode> = {
	create: <AddIcon />,
	remove: <DeleteIcon />,
	update: <EditIcon />,
};

export const ActivityCard: React.FC<ActivityCardProps> = (props) => {
	const { type, sphere, className, createdAt } = props;
	const { t } = useTranslation('room');
	return (
		<Card className={cn(styles.card, className)}>
			<CardContent className={styles.cardContent}>
				<Avatar
					className={styles.avatar}
					alt={t(`activities.type.${type}`)}
					color={colorMap[type]}>
					{iconMap[type]}
				</Avatar>
				<div>
					<Typography component='p'>
						{t('activities.text', {
							type,
							sphere,
						})}
					</Typography>
					<DateTime date={createdAt} format='MMM DD' />
				</div>
			</CardContent>
		</Card>
	);
};
