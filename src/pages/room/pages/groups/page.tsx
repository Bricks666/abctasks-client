import {
	ListItem,
	ListItemSecondaryAction,
	Skeleton,
	List,
	Stack
} from '@mui/material';
import * as React from 'react';
import { Popups, PopupsProps } from '@/widgets/page';
import {
	CreateGroup,
	CreateGroupButton,
	GroupCardActions,
	UpdateGroup
} from '@/features/groups';
import { useGroups, GroupLabel } from '@/entities/groups';
import { getEmptyArray, popupsMap, routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { RetryLoadingSlat } from '@/shared/ui';
import { pageModel } from './model';

export interface GroupsPageProps extends CommonProps {}

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.createGroup]: CreateGroup,
	[popupsMap.updateGroup]: UpdateGroup,
};

const GroupsPage: React.FC<GroupsPageProps> = React.memo(function GroupsPage(
	props
) {
	const { className, } = props;
	const groups = useGroups();
	const roomId = useParam(routes.room.groups, 'id');
	const isLoading = groups.pending;
	const isError = !!groups.error;

	/*
  TODO: Сделать другую разметку групп и переделать карточки
  Может сделать поиск и фильтрацию
  */

	if (isError) {
		const onRetry = () => {
			groups.start(roomId);
		};

		return (
			<RetryLoadingSlat
				className={className}
				buttonText='retry'
				content='Groups were not loaded. To retry?'
				onRetry={onRetry}
			/>
		);
	}

	let items: React.ReactElement[] | null = null;

	if (isLoading) {
		items = getEmptyArray(10).map((_, i) => (
			<ListItem key={i}>
				<Skeleton width='100%' height='1.5em' />
			</ListItem>
		));
	} else {
		items = groups.data.map((group) => (
			<ListItem key={group.id}>
				<GroupLabel {...group} />
				<ListItemSecondaryAction>
					<GroupCardActions groupId={group.id} />
				</ListItemSecondaryAction>
			</ListItem>
		));
	}

	return (
		<Stack className={className} spacing={1}>
			<CreateGroupButton />
			<List>{items}</List>
			<Popups popupMap={popupMap} />
		</Stack>
	);
});

pageModel.loaded();

export default GroupsPage;
