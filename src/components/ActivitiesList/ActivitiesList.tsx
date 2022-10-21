import * as React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { CommonProps } from '@/types/common';
import { Stack } from '@/ui/Stack';
import { Text } from '@/ui/Text';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { ActivityCard } from '../ActivityCard';
import { useActivities } from './useActivities';

import styles from './ActivitiesList.module.css';

export const ActivitiesList: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const { data: activities, loading } = useActivities();
	const isLoading = loading && !activities;
	return (
		<section className={cn(styles.container, className)}>
			<Text component='h3'>{t('activities.title')}</Text>
			<LoadingWrapper
				isLoading={isLoading}
				loadingIndicator={<LoadingIndicator size='small' />}>
				<Stack space='s'>
					{activities?.slice(0, 5).map((activity) => (
						<ActivityCard {...activity} key={activity.id} />
					))}
				</Stack>
			</LoadingWrapper>
		</section>
	);
};
