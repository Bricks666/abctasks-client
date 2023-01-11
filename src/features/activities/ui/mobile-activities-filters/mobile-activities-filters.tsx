import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Collapse } from '@mui/material';

import cn from 'classnames';
import * as React from 'react';
import { useToggle } from '@/shared/lib';
import {
	ActivitiesFilters,
	ActivitiesFiltersProps
} from '../activities-filters';

import styles from './mobile-activities-filters.module.css';

export interface MobileActivitiesFiltersProps extends ActivitiesFiltersProps {}

export const MobileActivitiesFilters: React.FC<MobileActivitiesFiltersProps> = (
	props
) => {
	const { className, } = props;
	const [open, { toggle, }] = useToggle();

	return (
		<div className={cn(styles.wrapper, className)}>
			<Button onClick={toggle}>
				Фильтры {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
			</Button>
			<Collapse in={open}>
				<ActivitiesFilters />
			</Collapse>
		</div>
	);
};
