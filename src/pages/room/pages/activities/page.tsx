import { Container } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { activitiesInRoomModel } from '@/entities/activities';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { RetryLoadingSlat } from '@/shared/ui';
import { pageModel } from './model';
import styles from './page.module.css';
import { ActivitiesHeader, ActivitiesPagination, ActivityList } from './ui';

const ActivitiesPage: React.FC<CommonProps> = React.memo((props) => {
	const { className, } = props;

	const roomId = useParam(routes.room.activities, 'id');
	const startQuery = useUnit(activitiesInRoomModel.query.start);
	const isError = !!useUnit(activitiesInRoomModel.query.$error);

	let children: React.ReactElement | null = null;

	if (isError) {
		const onRetry = () => {
			startQuery({ roomId, });
		};

		children = (
			<RetryLoadingSlat
				className={className}
				buttonText='retry'
				content='Activities were not loaded. Click to retry it'
				onRetry={onRetry}
			/>
		);
	} else {
		children = (
			<>
				<ActivityList />
				<ActivitiesPagination className={styles.pagination} />
			</>
		);
	}

	return (
		<Container className={cn(styles.wrapper, className)}>
			<ActivitiesHeader />
			{children}
		</Container>
	);
});

pageModel.loaded();

export default ActivitiesPage;
