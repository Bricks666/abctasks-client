import { useQuery } from '@farfetched/react';
import { List, ListItem } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { AddUserButton } from '@/features/rooms';
import { SearchUserForm } from '@/features/users';
import { searchedUsersModel, TemplateUserCard } from '@/entities/users';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { addUserPopupModel } from '../../model';

import styles from './add-users-into-room-popup.module.css';

export interface AddUsersIntoRoomPopupProps
	extends CommonProps,
		BasePopupProps {}

export const AddUsersIntoRoomPopup: React.FC<AddUsersIntoRoomPopupProps> = (
	props
) => {
	const { isOpen, } = props;

	const users = useQuery(searchedUsersModel.query);
	const roomId = useParam(routes.room, 'id');
	const onClose = useUnit(addUserPopupModel.close);

	return (
		<MainPopup isOpen={isOpen} onClose={onClose} header='Add user'>
			<SearchUserForm onSearch={users.start} debounceTimeout={300} />
			<List className={styles.list}>
				{users.data.map((user) => (
					<ListItem key={user.id}>
						<TemplateUserCard
							{...user}
							actions={<AddUserButton roomId={roomId} userId={user.id} />}
						/>
					</ListItem>
				))}
			</List>
		</MainPopup>
	);
};
