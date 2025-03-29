import { Autocomplete, Chip, ListItem, ListItemText } from '@mui/material';
import { reatomComponent } from '@reatom/npm-react';
import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps, PickerProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';

import { useActivitySpheres } from '../../lib';
import { ActivitySphere } from '../../models';

export type ActivitiesSpheresPickerProps = CommonProps &
	PickerProps<ActivitySphere> &
	Omit<FieldProps, 'onChange' | 'value' | 'className' | 'multiline'>;

export const ActivitiesSpheresPicker: FC<ActivitiesSpheresPickerProps> = memo(
	reatomComponent((props) => {
		const { value, onChange, multiple, limitTags, className, ctx, ...rest } =
			props;
		const spheres = useActivitySpheres();
		const { t, } = useTranslation('activities');

		const translate = (name: string) => {
			return t(`spheres.${name}`);
		};

		return (
			<Autocomplete
				className={className}
				value={value}
				onChange={onChange}
				loading={ctx.spy(spheres.pendingAtom)}
				options={ctx.spy(spheres.spheresAtom)}
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
	}, 'ActivitiesSpheresPicker')
);
