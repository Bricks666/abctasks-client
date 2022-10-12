import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { getGroupsQuery, removeGroupMutation } from '@/models/groups';
import {
	useGoBack,
	usePrepareLink,
	UsePrepareLinkResponse,
	useImminentlyQuery,
} from '@/hooks';
import { BasePopup, CommonProps, ID } from '@/types/common';
import { Group } from '@/ui/Group';
import { List } from '@/ui/List';
import { ListItem } from '@/ui/ListItem';
import { ListItemSecondaryAction } from '@/ui/ListItemSecondaryAction';
import { Button } from '@/ui/Button';
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
	const { id: roomId } = useParams();
	const { data: groups } = useImminentlyQuery(
		getGroupsQuery,
		Number(roomId),
		roomId
	);
	const removeGroup = useMutation(removeGroupMutation);
	const { t } = useTranslation('popups');
	const createGroup = usePrepareLink({
		addQuery: {
			[GET_PARAMS.popup]: POPUPS.createGroup,
		},
		saveQuery: true,
	});
	const updateGroup = usePrepareLink({
		addQuery: {
			[GET_PARAMS.popup]: POPUPS.updateGRoup,
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
				<Button to={createGroup} type='text'>
					{t('groups.add_group')}
				</Button>
				<List className={styles.list}>
					{groups?.map((group) => (
						<ListItem key={group.id}>
							<Group {...group} />
							<ListItemSecondaryAction>
								<IconButton to={createEditLink(updateGroup, group.id)}>
									<EditIcon />
								</IconButton>
								<IconButton
									onClick={() =>
										removeGroup.start({ id: group.id, roomId: group.roomId })
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
