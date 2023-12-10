import AnalyticsIcon from '@mui/icons-material/Analytics';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, IconButton, Tooltip } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

import { Aside } from '../aside';

import styles from './mobile-aside.module.css';

export interface MobileAsideProps extends CommonProps {}

export const MobileAside: React.FC<MobileAsideProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room-tasks');

	const [open, { toggle, toggleOff, }] = useToggle();
	const title = t('blocks.mobile_aside.title');
	const close = t('actions.close', { ns: 'common', });

	return (
		<div className={className}>
			<Tooltip title={title}>
				<IconButton onClick={toggle}>
					<AnalyticsIcon />
				</IconButton>
			</Tooltip>

			<Drawer
				classes={{
					paper: styles.drawer,
				}}
				open={open}
				onClose={toggleOff}
				anchor='right'>
				<div className={styles.header}>
					<Tooltip title={close}>
						<IconButton onClick={toggleOff}>
							<CloseIcon />
						</IconButton>
					</Tooltip>
				</div>
				<Aside disableBorder />
			</Drawer>
		</div>
	);
};
