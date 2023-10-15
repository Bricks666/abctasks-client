import { Container } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { ActivitiesFilters } from '@/features/activities';

import { CommonProps } from '@/shared/types';
import { SectionHeader } from '@/shared/ui';

import styles from './page.module.css';
import { ActivityList } from './ui';

const ActivitiesPage: React.FC<CommonProps> = React.memo((props) => {
	const { className, } = props;

	return (
		<Container className={cn(styles.wrapper, className)}>
			<SectionHeader title='Activities' actions={<ActivitiesFilters />} />
			<ActivityList />
		</Container>
	);
});

export default ActivitiesPage;
