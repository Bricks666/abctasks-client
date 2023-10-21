import { Autocomplete, Chip, ListItem, ListItemText } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { ActivitySphere } from '@/shared/api';
import { preparePickerHandler, preparePickerSelectedValue } from '@/shared/lib';
import { CommonProps, PickerProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';

import { useActivitySpheres } from '../../lib';

export type ActivitiesSpheresPickerProps = CommonProps &
	PickerProps<number> &
	Omit<FieldProps, 'onChange' | 'value' | 'className' | 'multiline'>;

export const ActivitiesSpheresPicker: React.FC<ActivitiesSpheresPickerProps> =
	React.memo((props) => {
		const { value, onChange, multiple, limitTags, className, ...rest } = props;
		const spheres = useActivitySpheres();
		const { t, } = useTranslation('activities');

		const changeHandler = preparePickerHandler<ActivitySphere, 'id', number>(
			{ multiple, onChange, },
			'id'
		);

		const selected = preparePickerSelectedValue(
			{ value, multiple, },
			spheres.data,
			'id'
		);

		const translate = (name: string) => {
			return t(`spheres.${name}`);
		};

		return (
			<Autocomplete
				className={className}
				value={selected as any}
				onChange={changeHandler as any}
				loading={spheres.pending}
				options={spheres.data}
				getOptionLabel={(sphere) => sphere.name}
				renderInput={(params) => {
					return <Field {...params} {...rest} />;
				}}
				renderTags={(value, getTagProps) => {
					return value.map((option, index) => (
						<Chip
							variant='outlined'
							label={translate(option.name)}
							{...getTagProps({ index, })}
						/>
					));
				}}
				renderOption={(props, option) => {
					const activity = translate(option.name);

					return (
						<ListItem {...props}>
							<ListItemText>{activity}</ListItemText>
						</ListItem>
					);
				}}
				limitTags={limitTags}
				multiple={multiple}
			/>
		);
	});
