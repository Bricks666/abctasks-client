import { MenuItem } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { statuses } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';

export interface StatusSelectProps
	extends CommonProps,
		Omit<FieldProps, 'select'> {
	readonly hasEmptyOption?: boolean;
	readonly emptyOptionText?: string;
}

export const StatusSelect: React.FC<StatusSelectProps> = React.memo((props) => {
	const { t, } = useTranslation('tasks');
	const { hasEmptyOption, emptyOptionText, ...rest } = props;
	return (
		<Field {...rest} select>
			{hasEmptyOption ? (
				<MenuItem value={null as any} key='empty'>
					{emptyOptionText}
				</MenuItem>
			) : null}
			{statuses.map((name) => (
				<MenuItem value={name} key={name}>
					{t(`statuses.${name}`)}
				</MenuItem>
			))}
		</Field>
	);
});
