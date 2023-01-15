import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, ActivityAction } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { DateTime } from '@/shared/ui';
import styles from './activity-card.module.css';

export interface ActivityCardProps extends CommonProps, Activity {}

const colorMap: Record<ActivityAction, 'success' | 'error' | 'warning'> = {
	create: 'success',
	remove: 'error',
	update: 'warning',
};

const iconMap: Record<ActivityAction, React.ReactNode> = {
	create: <AddIcon />,
	remove: <DeleteIcon />,
	update: <EditIcon />,
};

export const ActivityCard: React.FC<ActivityCardProps> = (props) => {
	const { action, sphere, className, createdAt, } = props;
	const { t, } = useTranslation('room');
	return (
		<Card className={cn(styles.card, className)} variant='outlined'>
			<CardContent className={styles.cardContent}>
				<Avatar
					className={cn(styles.avatar, styles[colorMap[action]])}
					alt={t(`activities.type.${action}`)!}>
					{iconMap[action]}
				</Avatar>
				<div>
					<Typography component='p'>
						{t('activities.text', {
							type: action,
							sphere: sphere.name,
						})}
					</Typography>
					<DateTime date={createdAt} format='HH:mm MMM DD' />
				</div>
			</CardContent>
		</Card>
	);
};
