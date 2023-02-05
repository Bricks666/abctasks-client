import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { ActivitiesFilters } from '@/features/activities';
import { CommonProps } from '@/shared/types';

import styles from './activities-header.module.css';

export interface ActivitiesHeaderProps extends CommonProps {
	readonly actions?: React.ReactElement | null;
}

export const ActivitiesHeader: React.FC<ActivitiesHeaderProps> = (props) => {
	const { actions, className, } = props;

	return (
		<header className={cn(styles.wrapper, className)}>
			<Typography variant='h5' component='h2' fontWeight={700}>
				Activities
			</Typography>
			<div className={styles.actions}>
				{actions}
				<ActivitiesFilters />
			</div>
		</header>
	);
};
