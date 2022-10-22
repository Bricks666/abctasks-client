import * as React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CommonProps } from '@/types/common';
import { EMPTY_ARRAYS } from '@/const/ui';
import { ActivityCard } from '../ActivityCard';
import { useActivities } from './useActivities';
import { SkeletonActivityCard } from '../SkeletonActivityCard';
import { StyledList, StyledWrapper, titleSx } from './styles';

export const ActivitiesList: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const { data: activities } = useActivities();
	const isLoading = !activities;

	return (
		<StyledWrapper className={className} spacing={1.5}>
			<Typography variant='body2' component='h3' sx={titleSx}>
				{t('activities.title')}
			</Typography>
			<StyledList spacing={1}>
				{isLoading
					? EMPTY_ARRAYS[4].map(() => <SkeletonActivityCard />)
					: activities
							.slice(0, 100)
							.map((activity) => (
								<ActivityCard {...activity} key={activity.id} />
							))}
			</StyledList>
		</StyledWrapper>
	);
};
