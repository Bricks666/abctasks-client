import { Container } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { ActivitiesFilters } from '@/features/activities';

import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { SectionHeader } from '@/shared/ui';

import styles from './page.module.css';
import { ActivityList } from './ui';

const ActivitiesPage: React.FC<CommonProps> = React.memo((props) => {
	const { className, } = props;
	const { t, } = useTranslation('room-activities');

	const title = t('title');

	usePageTitle(title);

	return (
		<Container className={cn(styles.wrapper, className)}>
			<SectionHeader title={title} actions={<ActivitiesFilters />} />
			<ActivityList />
		</Container>
	);
});

export default ActivitiesPage;
