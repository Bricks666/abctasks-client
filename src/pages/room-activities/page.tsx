import ReplayIcon from '@mui/icons-material/Replay';
import { Container } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { ActivitiesFilters } from '@/features/activities';

import { activitiesInRoomModel } from '@/entities/activities';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { TextWithAction, SectionHeader } from '@/shared/ui';

import styles from './page.module.css';
import { ActivitiesPagination, ActivityList } from './ui';

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
			<TextWithAction
				className={className}
				actionText='retry'
				text='Activities were not loaded. Click to retry it'
				onClick={onRetry}
				icon={<ReplayIcon />}
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
			<SectionHeader title='Activities' actions={<ActivitiesFilters />} />
			{children}
		</Container>
	);
});

export default ActivitiesPage;
