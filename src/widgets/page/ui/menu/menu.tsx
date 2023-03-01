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
import { Navigation } from '@/features/page';
import { RoomListItem, useRooms } from '@/entities/rooms';
import { useToggle } from '@/shared/lib';

import styles from './menu.module.css';

export const Menu: React.FC = () => {
	const [isOpen, { toggleOff: close, toggleOn: open, }] = useToggle();
	const rooms = useRooms();

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
					<List>
						<ListSubheader disableSticky>
							Комнаты, в которых я состою
						</ListSubheader>
						{rooms.data.map((room) => (
							<RoomListItem {...room} key={room.id} />
						))}
					</List>
				</div>
			</Drawer>
		</>
	);
};
