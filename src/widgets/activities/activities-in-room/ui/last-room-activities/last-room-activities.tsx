import ReplayIcon from '@mui/icons-material/Replay';
import { Typography } from '@mui/material';
import { useAction } from '@reatom/npm-react';
import { FC, useId } from 'react';
import { useTranslation } from 'react-i18next';

import { OpenAllRoomActivities } from '@/features/activities';

import {
	ActivityListItem,
	SkeletonActivityListItem,
	useActivities
} from '@/entities/activities';

import { CommonProps } from '@/shared/types';
import { FriendlyList, TextWithAction } from '@/shared/ui';

export interface LastRoomActivitiesProps extends CommonProps {
	readonly roomId: number;
	readonly disableBorder?: boolean;
}

export const LastRoomActivities: FC<LastRoomActivitiesProps> = (props) => {
	const { roomId, className, disableBorder, } = props;

	const id = useId();
	const model = useActivities({
		name: 'last-activities',
		roomId,
		count: 6,
	});

	const { t, } = useTranslation('activities');

	const emptyT = t('list.empty_text');
	const titleT = t('blocks.last_activities.title', { ns: 'room-tasks', });

	return (
		<FriendlyList
			className={className}
			dataAtom={model.activititesAtom}
			errorAtom={model.errorAtom}
			getKey={(item) => item.id}
			pendingAtom={model.pendingAtom}
			skeletonsCount={6}
			ErrorComponent={Error}
			ItemComponent={ActivityListItem}
			SkeletonComponent={SkeletonActivityListItem}
			emptyText={emptyT}
			slots={{
				before: (
					<Typography id={id} variant='h6' component='h2' fontWeight={700}>
						{titleT}
					</Typography>
				),
				after: <OpenAllRoomActivities roomId={roomId} />,
			}}
			disableBorder={disableBorder}
			rootProps={{
				component: 'section',
				'aria-labelledby': id,
			}}
		/>
	);
};

const Error: FC = () => {
	const { t, } = useTranslation('activities');

	const actionText = t('actions.retry', { ns: 'common', });
	const textT = t('actions.retry_actions.text');

	/**
	 * @todo Implement refetch
	 */
	const refetch = useAction(() => console.log('refetch'), []);

	return (
		<TextWithAction
			actionText={actionText}
			text={textT}
			onClick={refetch}
			icon={<ReplayIcon />}
		/>
	);
};
