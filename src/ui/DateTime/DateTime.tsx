import * as React from 'react';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { CommonProps } from '@/types/common';

export interface DateTimeProps extends CommonProps {
	readonly date: string | number | Date;
	readonly format: string;
}

export const DateTime: React.FC<DateTimeProps> = React.memo(function Datetime({
	date,
	format,
	className,
}) {
	const jsDate = new Date(date).toISOString();
	const showDate = dayjs(jsDate).format(format);
	return (
		<time className={className} dateTime={jsDate}>
			<Typography variant='body2' component='span'>
				{showDate}
			</Typography>
		</time>
	);
});
