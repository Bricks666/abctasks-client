import { Card, CardContent, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Activity } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { DateTime } from '@/shared/ui';

import { ActivityActionPicture } from '../activity-action-picture';

import styles from './activity-card.module.css';

export interface ActivityCardProps extends CommonProps, Activity {}

export const ActivityCard: React.FC<ActivityCardProps> = (props) => {
	const { action, sphere, className, createdAt, activist, } = props;
	const { t, } = useTranslation('room');
	return (
		<Card className={cn(styles.card, className)} variant='outlined'>
			<CardContent className={styles.cardContent}>
				<ActivityActionPicture {...action} />
				<div>
					<Typography component='p'>
						{t('activities.text', {
							type: action.name,
							sphere: sphere.name,
							activist: activist.username,
						})}
					</Typography>
					<DateTime date={createdAt} format='HH:mm MMM DD' />
				</div>
			</CardContent>
		</Card>
	);
};
