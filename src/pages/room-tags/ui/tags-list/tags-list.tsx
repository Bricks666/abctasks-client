import ReplayIcon from '@mui/icons-material/Replay';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { TagListItem } from '@/widgets/tags';

import { tagsModel, SkeletonTagListItem } from '@/entities/tags';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { FriendlyList, TextWithAction } from '@/shared/ui';

export const TagsList: React.FC<CommonProps> = (props) => {
	const { className, } = props;

	const { t, } = useTranslation('room-tags');

	const emptyText = t('list.empty_text');

	return (
		<FriendlyList
			className={className}
			$query={tagsModel.query}
			getKey={(item) => item.id}
			ItemComponent={TagListItem}
			SkeletonComponent={SkeletonTagListItem}
			skeletonsCount={15}
			ErrorComponent={Error}
			emptyText={emptyText}
		/>
	);
};

const Error: React.FC = () => {
	const { t, } = useTranslation('room-tags');

	const actionText = t('actions.retry', { ns: 'common', });
	const text = t('actions.retry_tags.text');

	const start = useUnit(tagsModel.query.start);

	const roomId = useParam(routes.room.tags, 'id');

	const onRetry = () => {
		start({ roomId, });
	};

	return (
		<TextWithAction
			actionText={actionText}
			text={text}
			onClick={onRetry}
			icon={<ReplayIcon />}
		/>
	);
};
