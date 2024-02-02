/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import MenuIcon from '@mui/icons-material/Menu';
import {
	Divider,
	Drawer,
	IconButton,
	List,
	ListSubheader
} from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Navigation } from '@/features/page';

import { RoomListItem, useRooms } from '@/entities/rooms';

import { useToggle } from '@/shared/lib';
import { Scrollable } from '@/shared/ui';

import styles from './menu.module.css';

export const Menu: React.FC = () => {
	const [isOpen, { toggleOff: close, toggleOn: open, }] = useToggle();
	const rooms = useRooms();
	const { t, } = useTranslation('common');

	const subheader = t('navigation.menu.title');

	return (
		<>
			<IconButton onClick={isOpen ? close : open}>
				<MenuIcon />
			</IconButton>
			<Drawer
				open={isOpen}
				onClose={close}
				onClick={close}
				PaperProps={{ className: styles.menu, }}>
				<Navigation />
				<Divider />
				<Scrollable direction='vertical' hideScroll={false}>
					<List className={styles.list} disablePadding>
						<ListSubheader disableSticky>{subheader}</ListSubheader>
						{rooms.data.map((room) => (
							<RoomListItem {...room} key={room.id} />
						))}
					</List>
				</Scrollable>
			</Drawer>
		</>
	);
};
