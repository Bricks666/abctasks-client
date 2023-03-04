import { MenuItem, Skeleton } from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';
import { useTags } from '../../lib';
import { TagLabel } from '../tag-label';

export interface TagPickerProps
	extends CommonProps,
		Omit<FieldProps, 'select'> {
	readonly hasEmptyOption?: boolean;
	readonly emptyOptionText?: string;
}

export const TagPicker: React.FC<TagPickerProps> = React.memo((props) => {
	const { className, hasEmptyOption, emptyOptionText, ...rest } = props;
	const tags = useTags();
	console.log(tags);

	return tags.pending ? (
		<Skeleton className={className} height='3em' />
	) : (
		<Field className={className} {...rest} select>
			{hasEmptyOption ? (
				<MenuItem value={null as any}>{emptyOptionText}</MenuItem>
			) : null}
			{tags.data.map((group) => (
				<MenuItem value={group.id} key={group.id}>
					<TagLabel {...group} />
				</MenuItem>
			))}
		</Field>
	);
});
