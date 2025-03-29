import { Autocomplete } from '@mui/material';
import { FC, memo } from 'react';

import { CommonProps, Fn, PickerProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';

import { Tag, Tags } from '../../models';
import { TagLabel } from '../tag-label';
import { TagListItemTemplate } from '../tag-list-item-template';

export type TagPickerProps = CommonProps &
	PickerProps<Tag> &
	Omit<FieldProps, 'onChange' | 'value' | 'className' | 'multiline'> & {
		readonly onInputChange?: Fn<[value: string], void>;
		readonly tags: Tags;
	};

export const TagPicker: FC<TagPickerProps> = memo((props) => {
	const { className, onChange, value, limitTags, multiple, tags, ...rest } =
		props;

	return (
		<Autocomplete
			className={className}
			options={tags}
			onChange={onChange}
			value={value}
			getOptionLabel={(tag) => tag.name}
			renderOption={(props, tag) => (
				<TagListItemTemplate {...props} {...tag} key={tag.id} />
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
