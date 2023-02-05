import cn from 'classnames';
import * as React from 'react';
import {
	useActivitiesInRoom,
	SkeletonActivityCard,
	ActivityCard
} from '@/entities/activities';
import { getEmptyArray } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import styles from './activity-list.module.css';

export interface ActivityListProps extends CommonProps {}

export const ActivityList: React.FC<ActivityListProps> = (props) => {
	const { className, } = props;

	const activities = useActivitiesInRoom();

	const { items, } = activities.data;

	return (
		<section className={cn(styles.list, className)}>
			{activities.pending
				? getEmptyArray(25).map((_, i) => <SkeletonActivityCard key={i} />)
				: items.map((activity) => (
					<ActivityCard {...activity} key={activity.id} />
				  ))}
		</section>
	);
};
