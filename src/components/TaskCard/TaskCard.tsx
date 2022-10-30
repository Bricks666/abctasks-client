import * as React from 'react';
import { CardContent, CardHeader, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@farfetched/react';
import { useGroup, usePrepareLink } from '@/hooks';
import { removeTaskMutation, Task } from '@/models/tasks';
import { CommonProps } from '@/types';
import { routes } from '@/const';
import { GroupLabel } from '@/ui/GroupLabel';
import { MenuOption } from '@/ui/MenuItem';
import { DateTime } from '@/ui/DateTime';
import { EditMenu } from '../EditMenu';
import { StyledCard, StyledContent } from './styles';
import { SkeletonGroupLabel } from '../SkeletonGroupLabel';

export interface TaskCardProps extends CommonProps, Task {}

export const TaskCard: React.FC<TaskCardProps> = React.memo((props) => {
	const { className, content, createdAt, id, status, roomId, groupId } = props;
	const { t } = useTranslation('common');
	const [isDrag, setIsDrag] = React.useState(false);
	const group = useGroup(groupId);
	const removeTask = useMutation(removeTaskMutation);
	const updateLink = usePrepareLink({
		query: {
			[routes.GET_PARAMS.popup]: routes.POPUPS.updateTask,
			[routes.GET_PARAMS.taskId]: id.toString(),
		},
	});

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

	if (group === null) {
		return null;
	}

	const title = group ? <GroupLabel {...group} /> : <SkeletonGroupLabel />;

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
				title={title}
				titleTypographyProps={{ component: 'div' }}
			/>
			<CardContent>
				<StyledContent>{content}</StyledContent>
				<div>
					<DateTime date={createdAt} format='MMM DD' />
					<Typography variant='body2' component='span'>
						0
					</Typography>
				</div>
			</CardContent>
		</StyledCard>
	);
});
