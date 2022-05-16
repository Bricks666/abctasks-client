import React, { FC, memo } from "react";
import { ClassNameProps } from "@/interfaces/common";
import dayjs from "dayjs";
import { Typography } from "@mui/material";

interface DateTimeProps extends ClassNameProps {
	readonly date: string | number | Date;
	readonly format: string;
}

export const DateTime: FC<DateTimeProps> = memo(function Datetime({
	date,
	format,
	className,
}) {
	const jsDate = new Date(date).toISOString();
	const showDate = dayjs(jsDate).format(format);
	return (
		<time className={className} dateTime={jsDate}>
			<Typography component="span" variant="body2">
				{showDate}
			</Typography>
		</time>
	);
});
