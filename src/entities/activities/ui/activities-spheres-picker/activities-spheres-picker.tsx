import { Autocomplete } from '@mui/material';
import * as React from 'react';

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

		const changeHandler = preparePickerHandler<ActivitySphere, 'id', number>(
			{ multiple, onChange, },
			'id'
		);

		const selected = preparePickerSelectedValue(
			{ value, multiple, },
			spheres.data,
			'id'
		);

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
				limitTags={limitTags}
				multiple={multiple}
			/>
		);
	});
