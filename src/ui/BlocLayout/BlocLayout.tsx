import React, { FC, memo } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";

import BlocLayoutStyle from "./BlocLayout.module.css";

interface BlocLayoutProps extends ClassNameProps {
	readonly columns?: number;
}

export const BlocLayout: FC<BlocLayoutProps> = memo(
	({ children, className, columns = 1 }) => {
		const style = { gridTemplateColumns: `repeat(${columns}, 1fr)` };
		return (
			<div
				className={classNames(BlocLayoutStyle.bloc, className)}
				style={style}
			>
				{children}
			</div>
		);
	}
);
