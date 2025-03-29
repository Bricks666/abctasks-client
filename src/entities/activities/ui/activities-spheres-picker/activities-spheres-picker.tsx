import { Autocomplete, Chip, ListItem, ListItemText } from '@mui/material';
import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { preparePickerHandler, preparePickerSelectedValue } from '@/shared/lib';
import type { CommonProps, PickerProps } from '@/shared/types';
import { Field, type FieldProps } from '@/shared/ui';

import type { ActivitySphereId, ActivitySpheres } from '../../models';

export type ActivitiesSpheresPickerProps = CommonProps &
	PickerProps<ActivitySphereId> &
	Omit<FieldProps, 'onChange' | 'value' | 'className' | 'multiline'> & {
		readonly spheres: ActivitySpheres;
		readonly loading?: boolean;
	};

export const ActivitiesSpheresPicker: FC<ActivitiesSpheresPickerProps> = memo(
	(props) => {
		const {
			value,
			onChange,
			multiple,
			limitTags,
			className,
			spheres,
			loading,
			...rest
		} = props;
		const { t, } = useTranslation('activities');

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
			spheres,
			'id'
		);

		const translate = (name: string) => {
			return t(`spheres.${name}`);
		};

		return (
			<Autocomplete
				className={className}
				value={selected}
				onChange={handleChange}
				loading={loading}
				options={spheres}
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
	}
);
