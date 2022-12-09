import {
	LinearProgress,
	linearProgressClasses,
	SxProps,
	Typography
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TaskProgress.module.css';
import { Progress, Group } from '@/models';
import { CommonProps } from '@/types';

export interface TaskProgressComponent
	extends CommonProps,
		Omit<Progress, 'groupId'>,
		Pick<Group, 'mainColor' | 'secondColor' | 'name'> {}

export const TaskProgress: React.FC<TaskProgressComponent> = React.memo(
	(props) => {
		const {
			completedCount,
			totalCount,
			className,
			mainColor,
			secondColor,
			name,
		} = props;
		const { t, } = useTranslation('room');

		const value = (completedCount / totalCount) * 100;

		const sx: SxProps = {
			backgroundColor: secondColor,
			[`& .${linearProgressClasses.bar}`]: {
				backgroundColor: mainColor,
			},
		};

		return (
			<div>
				<Typography className={styles.title} variant='body1'>
					{name}{' '}
					<Typography component='span' color='#b4b4b4'>
						{completedCount}/{totalCount}
					</Typography>
				</Typography>
				<LinearProgress
					className={cn(styles.progress, className)}
					variant='determinate'
					value={value}
					valueBuffer={100}
					aria-label={
						t('taskProgress.progressAria', {
							name,
							completed: completedCount,
						})!
					}
					sx={sx}
				/>
			</div>
		);
	}
);
