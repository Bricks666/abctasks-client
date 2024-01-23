import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import styles from './page-title.module.css';

export interface PageTitleProps extends CommonProps {
	readonly title: React.ReactNode;
	readonly extra?: React.ReactElement | null;
}

export const PageTitle: React.FC<PageTitleProps> = (props) => {
	const { extra, className, title, } = props;
	return (
		<div className={cn(styles.wrapper, className)}>
			<Typography className={styles.title} variant='h4' component='h1'>
				{title}
			</Typography>
			{extra}
		</div>
	);
};
