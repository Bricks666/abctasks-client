import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "../../interfaces/common";
import { SvgIcon } from "../SvgIcon";

import DotsIconStyle from "./DotsIcon.module.css";

export const DotsIcon: FC<ClassNameProps> = ({ className }) => {
	return (
		<SvgIcon className={classNames(DotsIconStyle.svg, className)}>
			<circle className={DotsIconStyle.circle} cx="3" cy="3" r="3" />
			<circle className={DotsIconStyle.circle} cx="10" cy="3" r="3" />
			<circle className={DotsIconStyle.circle} cx="17" cy="3" r="3" />
		</SvgIcon>
	);
};
