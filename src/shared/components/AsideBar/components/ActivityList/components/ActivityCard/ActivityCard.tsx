import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, ActivityType } from '@/shared/models';
import { Color, CommonProps } from '@/shared/types';
import { DateTime } from '@/shared/ui';
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
	const { type, sphere, className, createdAt, } = props;
	const { t, } = useTranslation('room');
	return (
		<Card className={cn(styles.card, className)}>
			<CardContent className={styles.cardContent}>
				<Avatar
					className={cn(styles.avatar, styles[colorMap[type]])}
					alt={t(`activities.type.${type}`)!}>
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
