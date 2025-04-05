import { Container } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { FiltrableActivities } from '@/widgets/activities';

import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

const ActivitiesPage: React.FC<CommonProps> = React.memo((props) => {
	const { className, } = props;
	const { t, } = useTranslation('room-activities');

	const titleT = t('title');

	usePageTitle(titleT);

	return (
		<Container className={cn(className)}>
			<FiltrableActivities />
		</Container>
	);
});

export default ActivitiesPage;
