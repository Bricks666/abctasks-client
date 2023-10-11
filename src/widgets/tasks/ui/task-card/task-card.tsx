import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

import {
	OpenUpdateTaskFormMenuItem,
	RemoveTaskMenuItem
} from '@/features/tasks';

import { TagLabel, SkeletonTagLabel } from '@/entities/tags';
import { TemplateTaskCard } from '@/entities/tasks';
import { UserAvatar } from '@/entities/users';

import { Task } from '@/shared/api';
import { getEmptyArray } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { EditMenu } from '@/shared/ui';

import { useTaskCardIsDrag } from '../../lib';
import { dragTaskModel } from '../../model';

import styles from './task-card.module.css';

export interface TaskCardProps extends CommonProps, Task {}

export const TaskCard: React.FC<TaskCardProps> = React.memo((props) => {
	const { tags, id, roomId, className, status, author, ...rest } = props;
	const [onDragEnd, onDragStart] = useUnit([
		dragTaskModel.dragEnded,
		dragTaskModel.dragStarted
	]);
	const isDrag = useTaskCardIsDrag(id);

	const actions = <CardMenu roomId={roomId} taskId={id} />;
	const tagElements =
		tags.length > 0
			? tags.map((tag) => <TagLabel {...tag} key={tag.id} />)
			: getEmptyArray(2).map((_, i) => <SkeletonTagLabel key={i} />);

	const userAvatar = <UserAvatar {...author} size={24} />;

	return (
		<TemplateTaskCard
			className={cn(styles.card, { [styles.drag]: isDrag, }, className)}
			{...rest}
			slots={{
				actions,
				userAvatar,
				tags: <div className={styles.tags}>{tagElements}</div>,
			}}
			id={id}
			status={status}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			data-id={id}
			data-status={status}
			draggable
		/>
	);
});

interface CardMenuProps {
	readonly taskId: number;
	readonly roomId: number;
}

const CardMenu: React.FC<CardMenuProps> = (props) => {
	return (
		<EditMenu>
			<OpenUpdateTaskFormMenuItem {...props} />
			<RemoveTaskMenuItem {...props} />
		</EditMenu>
	);
};
