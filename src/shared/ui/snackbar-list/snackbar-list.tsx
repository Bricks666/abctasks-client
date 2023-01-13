import { Collapse, Portal, Stack } from '@mui/material';
import cn from 'classnames';
import { useStoreMap, useUnit } from 'effector-react';
import * as React from 'react';
import { getSlideDirection, SnackbarStackModel } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { NotificationCard } from '../snackbar-item';

import styles from './snackbar-list.module.css';

export interface SnackbarListProps extends CommonProps {
	readonly model: SnackbarStackModel;
	readonly domRootSelector?: string;
}

export const SnackbarList: React.FC<SnackbarListProps> = (props) => {
	const { domRootSelector, className, model, } = props;
	const { items, close, unmounted, mounted, } = useUnit(model);
	const position = useStoreMap(model.$config, (config) => config.position);
	const { horizontal, vertical, } = position;

	const isEmpty = !items.length;

	const classes = cn(
		styles.container,
		styles[`horizontal__${horizontal}`],
		styles[`vertical__${vertical}`],
		className
	);

	const direction = getSlideDirection(position);

	const list = (
		<Collapse className={classes} in={!isEmpty} mountOnEnter unmountOnExit>
			<Stack direction='column-reverse' alignItems='flex-end' spacing={1}>
				{items.map((snackbar) => (
					<NotificationCard
						className={styles.item}
						{...snackbar}
						direction={direction}
						onClose={close}
						onMounted={mounted}
						onUnmounted={unmounted}
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
