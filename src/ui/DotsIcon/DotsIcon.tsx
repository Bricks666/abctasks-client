import classNames from "classnames";
import React, { FC, memo } from "react";
import { ClassNameProps } from "../../interfaces/common";
import { SvgIcon } from "../SvgIcon";

import DotsIconStyle from "./DotsIcon.module.css";

export const DotsIcon: FC<ClassNameProps> = memo(({ className }) => {
	return (
		<SvgIcon
			className={classNames(DotsIconStyle.icon, className)}
			viewBox="0 0 20 6"
		>
			<circle cx="3" cy="3" r="3" />
			<circle cx="10" cy="3" r="3" />
			<circle cx="17" cy="3" r="3" />
		</SvgIcon>
	);
});
