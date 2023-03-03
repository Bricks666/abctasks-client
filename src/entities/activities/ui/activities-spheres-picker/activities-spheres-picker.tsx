import { Autocomplete } from '@mui/material';
import * as React from 'react';
import { ActivitySphere } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';
import { useActivitySpheres } from '../../lib';

export interface ActivitiesSpheresPickerProps extends CommonProps {
	readonly value: number[];
	readonly onChange: (actions: number[]) => void;
	readonly label: string;
	readonly helperText?: string;
	readonly error?: boolean;
	readonly disabled?: boolean;
	readonly fullWidth?: boolean;
}

export const ActivitiesSpheresPicker: React.FC<ActivitiesSpheresPickerProps> =
	React.memo((props) => {
		const { value, onChange, className, ...rest } = props;
		const spheres = useActivitySpheres();

		const selected = spheres.data.filter((sphere) =>
			value?.includes(sphere.id)
		);

		const changeHandler = (_: unknown, spheres: ActivitySphere[]) => {
			onChange(spheres.map((sphere) => sphere.id));
		};

		return (
			<Autocomplete
				className={className}
				value={selected}
				onChange={changeHandler}
				loading={spheres.pending}
				options={spheres.data}
				getOptionLabel={(sphere) => sphere.name}
				renderInput={(params) => {
					return <Field {...params} {...rest} />;
				}}
				limitTags={2}
				multiple
			/>
		);
	});
