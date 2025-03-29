/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ListItem,
	ListItemProps,
	ListItemSecondaryAction,
	ListItemText
} from '@mui/material';
import * as React from 'react';

import { CommonProps, Slots } from '@/shared/types';

import { Tag } from '../../models';
import { TagLabel } from '../tag-label';

type TagListItemTemplateSlots = 'actions';

export interface TagListItemTemplateProps
	extends CommonProps,
		Pick<Tag, 'mainColor' | 'secondColor' | 'name'>,
		Omit<ListItemProps, keyof Tag | 'slots'> {
	readonly slots?: Slots<TagListItemTemplateSlots>;
}

export const TagListItemTemplate: React.FC<TagListItemTemplateProps> = (
	props
) => {
	const { mainColor, secondColor, name, className, slots, ...rest } = props;

	return (
		<ListItem className={className} {...rest}>
			<ListItemText>
				<TagLabel mainColor={mainColor} name={name} secondColor={secondColor} />
			</ListItemText>
			{slots?.actions ? (
				<ListItemSecondaryAction>{slots.actions}</ListItemSecondaryAction>
			) : null}
		</ListItem>
	);
};
