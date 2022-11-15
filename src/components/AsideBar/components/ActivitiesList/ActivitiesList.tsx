import * as React from 'react';
import { Typography } from '@mui/material';
import { useQuery } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { getActivitiesQuery } from '@/models';
import { CommonProps } from '@/types';
import { getEmptyArray } from '@/const';
import { ActivityCard } from './ActivityCard';
import { SkeletonActivityCard } from './SkeletonActivityCard';

import { StyledList, StyledWrapper, titleSx } from './styles';

export const ActivitiesList: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const { data: activities } = useQuery(getActivitiesQuery);
	const isLoading = !activities;

	return (
		<StyledWrapper className={className} spacing={1.5}>
			<Typography variant='body2' component='h3' sx={titleSx}>
				{t('activities.title')}
			</Typography>
			<StyledList spacing={1}>
				{isLoading
					? getEmptyArray(4).map((_, i) => <SkeletonActivityCard key={i} />)
					: activities
							.slice(0, 10)
							.map((activity) => (
								<ActivityCard {...activity} key={activity.id} />
							))}
			</StyledList>
		</StyledWrapper>
	);
};
