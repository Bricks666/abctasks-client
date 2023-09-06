import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

export interface DateTimeProps extends CommonProps {
	readonly date: string | number | Date;
	readonly format: string;
}

export const DateTime: React.FC<DateTimeProps> = React.memo(function Datetime(
	props
) {
	const { className, date, format, } = props;
	const jsDate = new Date(date).toISOString();
	const showDate = dayjs(jsDate).format(format);
	return (
		<Typography
			className={className}
			variant='body2'
			dateTime={jsDate}
			component='time'>
			{showDate}
		</Typography>
	);
});
