import * as React from 'react';
import cn from 'classnames';
import { useMutation } from '@farfetched/react';
import {
	ListItem,
	ListItemSecondaryAction,
	IconButton,
	Skeleton,
	List,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { getGroupsQuery, removeGroupMutation } from '@/models';
import { roomRoute } from '@/routes';
import { useParam } from '@/hooks';
import { getEmptyArray, getParams, popups } from '@/const';
import { CommonProps } from '@/types';
import { GroupLabel } from '@/shared/components';

import styles from './GroupsList.module.css';

export interface GroupsListProps extends CommonProps {}

export const GroupsList: React.FC<GroupsListProps> = React.memo(
	function GroupsList(props) {
		const { className } = props;
		const { t } = useTranslation('popups');
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
									[getParams.popup]: popups.updateGroup,
									[getParams.groupId]: group.id,
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
			: getEmptyArray(4).map((_, i) => (
					<ListItem key={i}>
						<Skeleton width='100%' height='1rem + 4px' />
					</ListItem>
			  ));

		return <List className={cn(styles.list, className)}>{items}</List>;
	}
);
