import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { TaskCardMenu } from '@/features/tasks';

import { roomModel } from '@/entities/rooms';
import { TagLabel, SkeletonTagLabel } from '@/entities/tags';
import { TemplateTaskCard } from '@/entities/tasks';

import { Tag, Task } from '@/shared/api';
import { getEmptyArray } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

import { useTaskCardIsDrag } from '../../lib';
import { dragTaskModel } from '../../model';

import styles from './task-card.module.css';

export interface TaskCardProps extends CommonProps, Task {
	readonly tags: Array<Tag | null>;
}

export const TaskCard: React.FC<TaskCardProps> = React.memo((props) => {
	const { tags, id, roomId, className, status, ...rest } = props;
	const [onDragEnd, onDragStart] = useUnit([
		dragTaskModel.dragEnded,
		dragTaskModel.dragStarted
	]);
	const isDrag = useTaskCardIsDrag(id);
	const canChange = useUnit(roomModel.$canChange);

	const actions = canChange ? (
		<TaskCardMenu roomId={roomId} taskId={id} />
	) : null;
	const tagElements =
		tags.length > 0
			? tags.map(
				(tag) =>
						(tag ? (
							<TagLabel {...tag} key={tag.id} />
						) : null) as React.ReactElement
			  )
			: getEmptyArray(2).map((_, i) => <SkeletonTagLabel key={i} />);

	return (
		<TemplateTaskCard
			className={cn(styles.card, { [styles.drag]: isDrag, }, className)}
			{...rest}
			actions={actions}
			id={id}
			status={status}
			tags={<div className={styles.tags}>{tagElements}</div>}
			draggable={canChange}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			data-id={id}
			data-status={status}
		/>
	);
});
