import { ListItemProps } from '@mui/material';
import * as React from 'react';

import { OpenUpdateTagButton, RemoveTag } from '@/features/tags';

import { TemplateTagListItem } from '@/entities/tags';

import { Tag } from '@/shared/api';
import { CommonProps } from '@/shared/types';

export interface TagListItemProps
	extends CommonProps,
		Tag,
		Omit<ListItemProps, keyof Tag> {}

export const TagListItem: React.FC<TagListItemProps> = (props) => {
	const { id, } = props;
	return (
		<TemplateTagListItem
			{...props}
			slots={{
				actions: <TagCardActions id={id} />,
			}}
		/>
	);
};

const TagCardActions: React.FC<{ id: number }> = (props) => {
	const { id, } = props;

	return (
		<div>
			<OpenUpdateTagButton tagId={id} />
			<RemoveTag tagId={id} />
		</div>
	);
};
