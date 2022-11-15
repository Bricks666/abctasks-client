import * as React from 'react';
import { CardContent, CardHeader, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@farfetched/react';
import { removeTaskMutation, Task } from '@/models';
import { roomRoute } from '@/routes';
import { SkeletonGroupLabel } from '@/components/SkeletonGroupLabel';
import { useGroup } from '@/hooks';
import { CommonProps } from '@/types';
import { getParams, popups } from '@/const';
import {
	GroupLabel,
	MenuOption,
	DateTime,
	EditMenu,
} from '@/shared/components';
import { StyledCard, StyledContent } from './styles';

export interface TaskCardProps extends CommonProps, Task {}

export const TaskCard: React.FC<TaskCardProps> = React.memo((props) => {
	const { className, content, createdAt, id, status, roomId, groupId } = props;
	const { t } = useTranslation('common');
	const [isDrag, setIsDrag] = React.useState(false);
	const group = useGroup(groupId);
	const removeTask = useMutation(removeTaskMutation);

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

	const options = React.useMemo<MenuOption<any>[]>(
		() => [
			{
				icon: <EditIcon />,
				label: t('actions.update'),
				to: roomRoute,
				params: {
					id: roomId,
				},
				query: {
					[getParams.popup]: popups.updateTask,
					[getParams.taskId]: id,
				},
			},
			{
				icon: <DeleteIcon />,
				label: t('actions.remove'),
				onClick: () => removeTask.start({ id, roomId }),
			},
		],
		[id, roomId]
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
