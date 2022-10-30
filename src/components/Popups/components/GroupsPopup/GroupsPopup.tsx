import * as React from 'react';
import {
	Button,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	Skeleton,
	Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { getGroupsQuery, removeGroupMutation } from '@/models/groups';
import { useClosePopup, usePrepareLink } from '@/hooks';
import { BasePopupProps, CommonProps } from '@/types';
import { routes, ui } from '@/const';
import { GroupLabel } from '@/ui/GroupLabel';
import { MainPopup } from '@/ui/MainPopup';

import styles from './GroupsPopup.module.css';

export interface GroupsPopupProps extends CommonProps, BasePopupProps {}

const createEditLink = (path: string, groupId: number | string): string => {
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

	const items = groups
		? groups.map((group) => (
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
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
		  ))
		: ui.EMPTY_ARRAYS[4].map((_, i) => (
				<ListItem key={i}>
					<Skeleton width='100%' height='1rem + 4px' />
				</ListItem>
		  ));

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
				<List className={styles.list}>{items}</List>
			</Stack>
		</MainPopup>
	);
};
