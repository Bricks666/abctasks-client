import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
	useGoBack,
	usePrepareLink,
	useTaskGroups,
	UsePrepareLinkResponse,
} from '@/hooks';
import { BasePopup, CommonProps, ID } from '@/interfaces/common';
import { Group } from '@/ui/Group';
import { List } from '@/ui/List';
import { ListItem } from '@/ui/ListItem';
import { ListItemSecondaryAction } from '@/ui/ListItemSecondaryAction';
import { Button } from '@/ui/Button';
import { deleteGroup } from '@/models/Groups';
import { IconButton } from '@/ui/IconButton';
import { DeleteIcon } from '@/ui/DeleteIcon';
import { GET_PARAMS, POPUPS } from '@/const';
import { MainPopup } from '@/ui/MainPopup';
import { Stack } from '@/ui/Stack';
import { EditIcon } from '@/ui/EditIcon';

import styles from './GroupsPopup.module.css';

export interface GroupsPopupProps extends CommonProps, BasePopup {}

const createEditLink = (params: UsePrepareLinkResponse, groupId: ID) => {
	return {
		...params,
		search: `${params.search}&${GET_PARAMS.groupId}=${groupId}`,
	};
};

export const GroupsPopup: React.FC<GroupsPopupProps> = (props) => {
	const onClose = useGoBack();
	const groups = useTaskGroups();
	const { t } = useTranslation('popups');
	const addGroupLink = usePrepareLink({
		addQuery: {
			[GET_PARAMS.popup]: POPUPS.createGroup,
		},
		saveQuery: true,
	});
	const editGroupLink = usePrepareLink({
		addQuery: {
			[GET_PARAMS.popup]: POPUPS.editGroup,
		},
		saveQuery: true,
	});

	return (
		<MainPopup
			{...props}
			onClose={onClose}
			header={t('groups.title')}
			alt={t('groups.title')}>
			<Stack>
				<Button to={addGroupLink} type='text'>
					{t('groups.add_group')}
				</Button>
				<List className={styles.list}>
					{groups.map((group) => (
						<ListItem key={group.id}>
							<Group {...group} />
							<ListItemSecondaryAction>
								<IconButton to={createEditLink(editGroupLink, group.id)}>
									<EditIcon />
								</IconButton>
								<IconButton
									onClick={() =>
										deleteGroup({ id: group.id, roomId: group.roomId })
									}>
									<DeleteIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			</Stack>
		</MainPopup>
	);
};
