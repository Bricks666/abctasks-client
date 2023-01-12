import { Collapse, Portal, Stack } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { Position, Snackbar } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { NotificationCard } from '../snackbar-item';

import styles from './snackbar-list.module.css';

export interface SnackbarListProps extends CommonProps {
	readonly items: Snackbar[];
	readonly position: Position;
	readonly domRootSelector?: string;
}

export const SnackbarList: React.FC<SnackbarListProps> = (props) => {
	const { items, position, domRootSelector, className, } = props;
	const { horizontal, vertical, } = position;

	const isEmpty = !items.length;

	const classes = cn(
		styles.container,
		styles[`horizontal__${horizontal}`],
		styles[`vertical__${vertical}`],
		className
	);

	const list = (
		<Collapse className={classes} in={!isEmpty} mountOnEnter unmountOnExit>
			<Stack direction='column-reverse' alignItems='flex-end' spacing={1}>
				{items.map((snackbar) => (
					<NotificationCard
						className={styles.item}
						{...snackbar}
						key={snackbar.id}
					/>
				))}
			</Stack>
		</Collapse>
	);

	return domRootSelector ? (
		<Portal container={document.querySelector(domRootSelector)}>{list}</Portal>
	) : (
		list
	);
};
