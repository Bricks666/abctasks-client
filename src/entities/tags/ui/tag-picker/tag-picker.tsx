import { Autocomplete } from '@mui/material';
import { FC, memo } from 'react';

import { preparePickerHandler, preparePickerSelectedValue } from '@/shared/lib';
import { CommonProps, Fn, PickerProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';

import { TagId, Tags } from '../../models';
import { TagLabel } from '../tag-label';
import { TagListItemTemplate } from '../tag-list-item-template';

export type TagPickerProps = CommonProps &
	PickerProps<TagId> &
	Omit<FieldProps, 'onChange' | 'value' | 'className' | 'multiline'> & {
		readonly onInputChange?: Fn<[value: string], void>;
		readonly tags: Tags;
		readonly loading?: boolean;
	};

export const TagPicker: FC<TagPickerProps> = memo((props) => {
	const {
		className,
		onChange,
		value,
		limitTags,
		multiple,
		tags,
		loading,
		...rest
	} = props;

	const handleChange = preparePickerHandler(
		{
			onChange,
			multiple,
		},
		'id'
	);
	const selected = preparePickerSelectedValue(
		{
			value,
			multiple,
		},
		tags,
		'id'
	);

	return (
		<Autocomplete
			className={className}
			options={tags}
			loading={loading}
			value={selected}
			onChange={handleChange}
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
