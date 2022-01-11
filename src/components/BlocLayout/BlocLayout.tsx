import React, { FC } from "react";
import classNames from "classnames";
import { OnlyClassName } from "../../interfaces/common";

import BlocLayoutStyle from "./BlocLayout.module.css";

export const BlocLayout: FC<OnlyClassName> = ({ children, className }) => {
	return (
		<div className={classNames(BlocLayoutStyle.bloc, className)}>
			{children}
		</div>
	);
};
