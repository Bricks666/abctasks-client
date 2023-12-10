import { ListItemProps } from '@mui/material';
import * as React from 'react';

import { TagCardActions } from '@/features/tags';

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
				actions: <TagCardActions tagId={id} />,
			}}
		/>
	);
};
