import * as React from 'react';
import dayjs from 'dayjs';
import { CommonProps } from '@/types/common';
import { Text } from '../Text';

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
			<Text component='span'>{showDate}</Text>
		</time>
	);
});
