import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

import styles from './section-header.module.css';

export interface SectionHeaderProps extends CommonProps {
	readonly title: string;
	readonly actions?: React.ReactElement | null;
}

export const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
	const { title, actions, className, } = props;
	return (
		<header className={cn(styles.wrapper, className)}>
			<Typography variant='h5' component='h2' fontWeight={700}>
				{title}
			</Typography>
			<div className={styles.actions}>{actions}</div>
		</header>
	);
};
