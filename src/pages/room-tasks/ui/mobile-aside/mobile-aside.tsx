import AnalyticsIcon from '@mui/icons-material/Analytics';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, IconButton, Tooltip } from '@mui/material';
import * as React from 'react';

import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

import { Aside } from '../aside';

import styles from './mobile-aside.module.css';

export interface MobileAsideProps extends CommonProps {}

export const MobileAside: React.FC<MobileAsideProps> = (props) => {
	const { className, } = props;

	const [open, { toggle, toggleOff, }] = useToggle();

	return (
		<div className={className}>
			<Tooltip title='Статистика'>
				<IconButton onClick={toggle}>
					<AnalyticsIcon />
				</IconButton>
			</Tooltip>

			<Drawer open={open} onClose={toggleOff} anchor='right'>
				<div className={styles.header}>
					<Tooltip title='Закрыть'>
						<IconButton onClick={toggleOff}>
							<CloseIcon />
						</IconButton>
					</Tooltip>
				</div>
				<Aside />
			</Drawer>
		</div>
	);
};
