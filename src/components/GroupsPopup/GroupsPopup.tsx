import * as React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { getGroupsQuery, removeGroupMutation } from '@/models/groups';
import { useClosePopup, usePrepareLink } from '@/hooks';
import { BasePopupProps, CommonProps, ID } from '@/types';
import { GroupLabel } from '@/ui/GroupLabel';
import { List } from '@/ui/List';
import { ListItem } from '@/ui/ListItem';
import { ListItemSecondaryAction } from '@/ui/ListItemSecondaryAction';
import { Button } from '@/ui/Button';
import { IconButton } from '@/ui/IconButton';
import { RemoveIcon } from '@/ui/RemoveIcon';
import { routes } from '@/const';
import { MainPopup } from '@/ui/MainPopup';
import { Stack } from '@/ui/Stack';
import { EditIcon } from '@/ui/EditIcon';

import styles from './GroupsPopup.module.css';

export interface GroupsPopupProps extends CommonProps, BasePopupProps {}

const createEditLink = (path: string, groupId: ID): string => {
	return `${path}&${routes.GET_PARAMS.groupId}=${groupId}`;
};

export const GroupsPopup: React.FC<GroupsPopupProps> = (props) => {
	const onClose = useClosePopup(routes.POPUPS.groups);
	const { data: groups } = useQuery(getGroupsQuery);
	const removeGroup = useMutation(removeGroupMutation);
	const { t } = useTranslation('popups');
	const createGroup = usePrepareLink({
		query: {
			[routes.GET_PARAMS.popup]: routes.POPUPS.createGroup,
		},
		keepOldQuery: true,
	});
	const updateGroup = usePrepareLink({
		query: {
			[routes.GET_PARAMS.popup]: routes.POPUPS.updateGroup,
		},
		keepOldQuery: true,
	});

	return (
		<MainPopup
			{...props}
			onClose={onClose}
			header={t('groups.title')}
			alt={t('groups.title')}>
			<Stack>
				<Button component={Link} to={createGroup} type='text'>
					{t('actions.create', { ns: 'common' })}
				</Button>
				<List className={styles.list}>
					{groups?.map((group) => (
						<ListItem key={group.id}>
							<GroupLabel {...group} />
							<ListItemSecondaryAction>
								<IconButton
									component={Link}
									to={createEditLink(updateGroup, group.id)}
									title={t('actions.update', { ns: 'common' })}>
									<EditIcon />
								</IconButton>
								<IconButton
									onClick={() =>
										removeGroup.start({ id: group.id, roomId: group.roomId })
									}
									title={t('actions.remove', { ns: 'common' })}>
									<RemoveIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			</Stack>
		</MainPopup>
	);
};
