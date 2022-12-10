import { useMutation } from '@farfetched/react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { roomRoute } from '@/shared/configs';
import { getParams, popups } from '@/shared/const';
import { useGroup } from '@/shared/lib';
import { removeTaskMutation, Task } from '@/shared/models';
import { CommonProps } from '@/shared/types';
import {
	GroupLabel,
	MenuOption,
	DateTime,
	EditMenu,
	SkeletonGroupLabel
} from '@/shared/ui';
import styles from './TaskCard.module.css';

export interface TaskCardProps extends CommonProps, Task {}

export const TaskCard: React.FC<TaskCardProps> = React.memo((props) => {
	const { className, content, createdAt, id, status, roomId, groupId, } = props;
	const { t, } = useTranslation('common');
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
				onClick: () => removeTask.start({ id, roomId, }),
			}
		],
		[id, roomId]
	);

	if (group === null) {
		return null;
	}

	const title = group ? <GroupLabel {...group} /> : <SkeletonGroupLabel />;

	return (
		<Card
			className={cn(styles.card, { [styles.drag]: isDrag, }, className)}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			draggable
			component='article'>
			<CardHeader
				action={
					<EditMenu
						options={options}
						size='small'
						alt="Open task's edit menu "
					/>
				}
				title={title}
				titleTypographyProps={{ component: 'div', }}
			/>
			<CardContent>
				<Typography className={styles.content}>{content}</Typography>
				<div>
					<DateTime date={createdAt} format='MMM DD' />
					<Typography variant='body2' component='span'>
						0
					</Typography>
				</div>
			</CardContent>
		</Card>
	);
});
