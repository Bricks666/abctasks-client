import cn from 'classnames';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import { LastActivities } from '../last-activities';
import { TasksProgress } from '../tasks-progresses';

import styles from './aside.module.css';

export interface AsideProps extends CommonProps {
	readonly disableBorder?: boolean;
}

export const Aside: React.FC<AsideProps> = (props) => {
	const { className, disableBorder, } = props;

	return (
		<div className={cn(styles.aside, className)}>
			<TasksProgress disableBorder={disableBorder} />
			<LastActivities disableBorder={disableBorder} />
		</div>
	);
};
