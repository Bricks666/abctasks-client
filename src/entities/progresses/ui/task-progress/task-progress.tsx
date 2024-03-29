import {
	LinearProgress,
	linearProgressClasses,
	ListItem,
	SxProps,
	Typography
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Progress } from '@/shared/api';
import { CommonProps } from '@/shared/types';

import styles from './task-progress.module.css';

export interface TaskProgressComponent extends CommonProps, Progress {}

export const TaskProgress: React.FC<TaskProgressComponent> = React.memo(
	(props) => {
		const { donecount, totalcount, className, tag, } = props;
		const { mainColor, secondColor, name, } = tag;
		const { t, } = useTranslation('room-tasks');

		const value = (Number(donecount) / Number(totalcount)) * 100;

		const sx: SxProps = {
			backgroundColor: secondColor,
			[`& .${linearProgressClasses.bar}`]: {
				backgroundColor: mainColor,
			},
		};

		const ariaLabel = t('blocks.tasks_progress.aria_label', {
			tag_name: name,
			done_count: donecount,
			total_count: totalcount,
		});

		return (
			<ListItem className={cn(styles.item, className)}>
				<Typography className={styles.title} variant='body1'>
					{name}{' '}
					<Typography component='span' color='#b4b4b4'>
						{donecount}/{totalcount}
					</Typography>
				</Typography>
				<LinearProgress
					className={styles.progress}
					variant='determinate'
					value={value}
					valueBuffer={100}
					aria-label={ariaLabel}
					sx={sx}
				/>
			</ListItem>
		);
	}
);
