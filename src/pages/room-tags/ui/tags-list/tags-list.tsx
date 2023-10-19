import ReplayIcon from '@mui/icons-material/Replay';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { TagListItem } from '@/widgets/tags';

import { tagsModel, SkeletonTagListItem } from '@/entities/tags';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { FriendlyList, TextWithAction } from '@/shared/ui';

export const TagsList: React.FC<CommonProps> = (props) => {
	const { className, } = props;

	return (
		<FriendlyList
			className={className}
			$query={tagsModel.query}
			getKey={(item) => item.id}
			ItemComponent={TagListItem}
			SkeletonComponent={SkeletonTagListItem}
			skeletonsCount={15}
			ErrorComponent={Error}
			emptyText='There is not tags in the room yet'
		/>
	);
};

const Error: React.FC = () => {
	const start = useUnit(tagsModel.query.start);

	const roomId = useParam(routes.room.tags, 'id');

	const onRetry = () => {
		start({ roomId, });
	};

	return (
		<TextWithAction
			actionText='retry'
			text='Tags were not loaded. To retry?'
			onClick={onRetry}
			icon={<ReplayIcon />}
		/>
	);
};
