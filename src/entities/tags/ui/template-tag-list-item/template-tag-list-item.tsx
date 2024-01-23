/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ListItem,
	ListItemProps,
	ListItemSecondaryAction,
	ListItemText
} from '@mui/material';
import * as React from 'react';

import { Tag } from '@/shared/api';
import { CommonProps, Slots } from '@/shared/types';

import { TagLabel } from '../tag-label';

export interface TemplateTagListItemProps
	extends CommonProps,
		Tag,
		Omit<ListItemProps, keyof Tag | 'slots'> {
	readonly slots?: Slots<'actions'>;
}

export const TemplateTagListItem: React.FC<TemplateTagListItemProps> = (
	props
) => {
	const {
		id: _,
		mainColor,
		secondColor,
		name,
		className,
		slots,
		...rest
	} = props;

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
