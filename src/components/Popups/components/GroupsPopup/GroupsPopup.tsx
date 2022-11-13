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
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import { useMutation } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { closeGroupsPopup } from '@/models/routing';
import { getGroupsQuery, removeGroupMutation } from '@/models/groups';
import { roomRoute } from '@/routes';
import { useParam } from '@/hooks';
import { BasePopupProps, CommonProps } from '@/types';
import { routes, ui } from '@/const';
import { GroupLabel } from '@/ui/GroupLabel';
import { MainPopup } from '@/ui/MainPopup';

import styles from './GroupsPopup.module.css';

export interface GroupsPopupProps extends CommonProps, BasePopupProps {}

export const GroupsPopup: React.FC<GroupsPopupProps> = (props) => {
	const { t } = useTranslation('popups');
	const onClose = useUnit(closeGroupsPopup);
	const groups = useUnit(getGroupsQuery.$data);
	const roomId = useParam(roomRoute, 'id');
	const removeGroup = useMutation(removeGroupMutation);

	const items = groups
		? groups.map((group) => (
				<ListItem key={group.id}>
					<GroupLabel {...group} />
					<ListItemSecondaryAction>
						<IconButton
							title={t('actions.update', { ns: 'common' })}
							to={roomRoute}
							params={{ id: roomId }}
							query={{
								[routes.GET_PARAMS.popup]: routes.POPUPS.updateGroup,
								[routes.GET_PARAMS.groupId]: group.id,
							}}
							component={Link}>
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
		: ui.getEmptyArray(4).map((_, i) => (
				<ListItem key={i}>
					<Skeleton width='100%' height='1rem + 4px' />
				</ListItem>
		  ));

	return (
		<MainPopup
			{...props}
			onClose={() => onClose()}
			header={t('groups.title')}
			alt={t('groups.title')}>
			<Stack>
				<Button
					variant='text'
					to={roomRoute}
					params={{ id: roomId }}
					query={{ [routes.GET_PARAMS.popup]: routes.POPUPS.createGroup }}
					component={Link}>
					{t('actions.create', { ns: 'common' })}
				</Button>
				<List className={styles.list}>{items}</List>
			</Stack>
		</MainPopup>
	);
};
