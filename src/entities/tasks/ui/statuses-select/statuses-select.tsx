import { MenuItem } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { statuses } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';

export interface StatusesSelectProps
	extends CommonProps,
		Omit<FieldProps, 'select'> {}

export const StatusesSelect: React.FC<StatusesSelectProps> = React.memo(
	(props) => {
		const { t, } = useTranslation('popups');
		return (
			<Field {...props} select>
				{statuses.map((name) => (
					<MenuItem value={name} key={name}>
						{t(`statuses.${name}`, { ns: 'task', })}
					</MenuItem>
				))}
			</Field>
		);
	}
);
