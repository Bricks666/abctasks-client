import { useUnit } from 'effector-react';
import * as React from 'react';
import { TaskCardMenu } from '@/features/tasks';
import { roomModel } from '@/entities/rooms';
import { TagLabel, tagsModel, SkeletonTagLabel } from '@/entities/tags';
import { TemplateTaskCard } from '@/entities/tasks';
import { Tag, Task } from '@/shared/api';
import { getEmptyArray } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

export interface TaskCardProps extends CommonProps, Task {
	readonly tags: Array<Tag | null>;
}

export const TaskCard: React.FC<TaskCardProps> = React.memo((props) => {
	const { tags, id, roomId, } = props;
	const canChange = useUnit(roomModel.$canChange);

	const status = useUnit(tagsModel.query.$status);
	const isLoading = status === 'initial' || status === 'pending';

	if (!isLoading && !tags) {
		return null;
	}

	const actions = canChange ? (
		<TaskCardMenu roomId={roomId} taskId={id} />
	) : null;
	const tagElements = tags
		? tags.map(
			(tag) =>
					(tag ? (
						<TagLabel {...tag} key={tag.id} />
					) : null) as React.ReactElement
		  )
		: getEmptyArray(2).map((_, i) => <SkeletonTagLabel key={i} />);

	return (
		<TemplateTaskCard
			{...props}
			actions={actions}
			tags={tagElements}
			draggable={canChange}
		/>
	);
});
