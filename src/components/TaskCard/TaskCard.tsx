import * as React from 'react';
import { CardContent, CardHeader } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@farfetched/react';
import { useGroupsMap, usePrepareLink } from '@/hooks';
import { removeTaskMutation, Task } from '@/models/tasks';
import { CommonProps } from '@/types/common';
import { GET_PARAMS, POPUPS } from '@/const';
import { Group } from '@/ui/Group';
import { Text } from '@/ui/Text';
import { MenuOption } from '@/ui/MenuItem';
import { DateTime } from '@/ui/DateTime';
import { EditMenu } from '../EditMenu';
import { StyledCard, StyledContent } from './styles';

export interface TaskCardProps extends CommonProps, Task {}

export const TaskCard: React.FC<TaskCardProps> = ({
	className,
	content,
	groupId,
	createdAt,
	id,
	status,
	roomId,
}) => {
	const { t } = useTranslation('common');
	const [isDrag, setIsDrag] = React.useState(false);
	const removeTask = useMutation(removeTaskMutation);
	const updateLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: POPUPS.updateTask,
			[GET_PARAMS.taskId]: id.toString(),
		},
	});
	const { data: groups } = useGroupsMap(roomId);
	const group = groups[groupId];

	const onDragStart = React.useCallback<React.DragEventHandler>(
		(evt) => {
			evt.dataTransfer.clearData();
			evt.dataTransfer.setData('status', status.toString());
			evt.dataTransfer.setData('taskId', id.toString());
			setIsDrag(true);
		},
		[status, id]
	);

	const onDragEnd = React.useCallback<React.DragEventHandler>((evt) => {
		setIsDrag(false);
		evt.dataTransfer.clearData();
	}, []);

	const options: MenuOption[] = React.useMemo(
		() => [
			{
				icon: <EditIcon />,
				label: t('actions.update'),
				to: updateLink,
			},
			{
				icon: <DeleteIcon />,
				label: t('actions.remove'),
				onClick: () => removeTask.start({ id, roomId }),
			},
		],
		[updateLink, id, roomId]
	);

	if (!group) {
		return null;
	}

	return (
		<StyledCard
			className={className}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			isDrag={isDrag}
			draggable>
			<CardHeader
				action={
					<EditMenu
						options={options}
						size='small'
						alt="Open task's edit menu "
					/>
				}
				title={<Group {...group} />}
				titleTypographyProps={{ component: 'div' }}
			/>
			<CardContent>
				<StyledContent>{content}</StyledContent>
				<div>
					<DateTime date={createdAt} format='MMM DD' />
					<Text component='span'>0</Text>
				</div>
			</CardContent>
		</StyledCard>
	);
};
