import { Autocomplete, ListItem } from '@mui/material';
import * as React from 'react';
import { Tag } from '@/shared/api';
import { CommonProps, PickerProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';
import { useTags } from '../../lib';
import { TagLabel } from '../tag-label';

export type TagPickerProps = CommonProps &
	PickerProps<number> &
	Omit<FieldProps, 'onChange' | 'value' | 'className' | 'multiline'>;

export const TagPicker: React.FC<TagPickerProps> = React.memo((props) => {
	const { className, onChange, value, limitTags, multiple, ...rest } = props;
	const tags = useTags();

	let changeHandler;
	if (multiple) {
		changeHandler = (_: unknown, tags: Tag[]) => {
			onChange(tags.map((tag) => tag.id));
		};
	} else {
		changeHandler = (_: unknown, tag: Tag | null) => {
			onChange(tag?.id || null);
		};
	}

	let selected;
	if (multiple) {
		selected = tags.data.filter((tag) => value.includes(tag.id));
	} else {
		selected = tags.data.find((tag) => tag.id === value) ?? null;
	}

	return (
		<Autocomplete
			className={className}
			options={tags.data}
			loading={tags.pending}
			onChange={changeHandler as any}
			value={selected as any}
			getOptionLabel={(tag) => tag.name}
			renderOption={(props, tag) => (
				<ListItem {...props} key={tag.id}>
					<TagLabel {...tag} />
				</ListItem>
			)}
			renderTags={(tags, getTagProps) => {
				return tags.map((tag, index) => (
					<TagLabel {...tag} {...getTagProps({ index, })} />
				));
			}}
			renderInput={(params) => <Field {...params} {...rest} />}
			limitTags={limitTags}
			multiple={multiple}
		/>
	);
});
