import React, { FC, memo } from "react";
import classNames from "classnames";
import { ClassNameComponent } from "../../interfaces/common";

import BlocLayoutStyle from "./BlocLayout.module.css";

export const BlocLayout: FC<ClassNameComponent> = memo(
	({ children, className }) => {
		return (
			<div className={classNames(BlocLayoutStyle.bloc, className)}>
				{children}
			</div>
		);
	}
);
