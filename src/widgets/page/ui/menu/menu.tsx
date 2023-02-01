/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Drawer, IconButton } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { Navigation } from '@/features/page';
import { menuModel } from '../../model';

import styles from './menu.module.css';

export const Menu: React.FC = () => {
	const isOpen = useUnit(menuModel.$isOpen);
	const close = useUnit(menuModel.close);
	const open = useUnit(menuModel.open);

	return (
		<>
			<IconButton onClick={isOpen ? close : open}>
				<MenuIcon />
			</IconButton>
			<Drawer
				open={isOpen}
				onClose={close}
				PaperProps={{ className: styles.menu, }}>
				<div onClick={close}>
					<Navigation />
					<Divider />
				</div>
			</Drawer>
		</>
	);
};
