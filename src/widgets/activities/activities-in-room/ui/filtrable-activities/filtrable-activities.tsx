import ReplayIcon from '@mui/icons-material/Replay';
import { useAction, useAtom } from '@reatom/npm-react';
import cn from 'classnames';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ActivitiesFilters, ActivitiesPagination } from '@/features/activities';

import {
	ActivityListItem,
	SkeletonActivityListItem,
	useActivities
} from '@/entities/activities';

import { CommonProps } from '@/shared/types';
import { FriendlyList, SectionHeader, TextWithAction } from '@/shared/ui';

import styles from './styles.module.css';

export interface FiltrableActivitiesProps extends CommonProps {
	readonly roomId: number;
}

export const FiltrableActivities: FC<FiltrableActivitiesProps> = memo(
	(props) => {
		const { className, roomId, } = props;

		const { t, } = useTranslation('activities');

		const model = useActivities({
			name: 'acitivies-in-room',
			roomId,
			count: 50,
		});
		const changeFetchActivitiesParams = useAction(
			model.changeFetchActivitiesParams
		);
		const [pageCount] = useAtom(model.pagesCountAtom);
		const [hasItems] = useAtom(model.hasItemsAtom);

		const emptyT = t('list.empty_text');
		const titleT = t('title');

		return (
			<section className={cn(styles.wrapper, className)}>
				<SectionHeader
					title={titleT}
					slots={{
						actions: (
							<ActivitiesFilters
								onFiltersChanged={changeFetchActivitiesParams}
								roomId={roomId}
							/>
						),
					}}
				/>
				<FriendlyList
					dataAtom={model.activititesAtom}
					errorAtom={model.errorAtom}
					getKey={(item) => item.id}
					pendingAtom={model.pendingAtom}
					skeletonsCount={50}
					ErrorComponent={Error}
					ItemComponent={ActivityListItem}
					SkeletonComponent={SkeletonActivityListItem}
					emptyText={emptyT}
					slots={{
						after: hasItems ? (
							<ActivitiesPagination
								className={styles.pagination}
								onPageChanged={changeFetchActivitiesParams}
								pageCount={pageCount}
							/>
						) : null,
					}}
				/>
			</section>
		);
	}
);

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
