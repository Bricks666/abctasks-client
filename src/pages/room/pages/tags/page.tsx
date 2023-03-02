import { ListItem, Skeleton, List, Stack, Container } from '@mui/material';
import * as React from 'react';
import { Popups, PopupsProps } from '@/widgets/page';
import {
	CreateTag,
	CreateTagButton,
	TagCardActions,
	UpdateTag
} from '@/features/tags';
import { useTags, TagListItem } from '@/entities/tags';
import { getEmptyArray, popupsMap, routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { RetryLoadingSlat } from '@/shared/ui';
import { pageModel } from './model';

export interface TagsPageProps extends CommonProps {}

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.createTag]: CreateTag,
	[popupsMap.updateTag]: UpdateTag,
};

const TagsPage: React.FC<TagsPageProps> = React.memo(function TagsPage(props) {
	const { className, } = props;
	const tags = useTags();
	const roomId = useParam(routes.room.tags, 'id');
	const isLoading = tags.pending;
	const isError = !!tags.error;

	/*
  TODO: Сделать другую разметку групп и переделать карточки
  Может сделать поиск и фильтрацию
  */

	if (isError) {
		const onRetry = () => {
			tags.start(roomId);
		};

		return (
			<RetryLoadingSlat
				className={className}
				buttonText='retry'
				content='Tags were not loaded. To retry?'
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
		items = tags.data.map((group) => (
			<TagListItem
				{...group}
				actions={<TagCardActions tagId={group.id} />}
				key={group.id}
			/>
		));
	}

	return (
		<Container>
			<Stack className={className} spacing={1}>
				<CreateTagButton />
				<List>{items}</List>
				<Popups popupMap={popupMap} />
			</Stack>
		</Container>
	);
});

pageModel.loaded();

export default TagsPage;
