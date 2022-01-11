import React, { FC, ReactText } from "react";
import classNames from "classnames";
import { OnlyClassName } from "../../interfaces/common";

import ProgressBarStyle from "./ProgressBar.module.css";

interface ProgressBarComponent extends OnlyClassName {
	children: ReactText;
	maxValue: number;
	currentValue: number;
}

export const ProgressBar: FC<ProgressBarComponent> = ({
	currentValue,
	maxValue,
	children,
	className,
}) => {
	return (
		<label className={classNames(ProgressBarStyle.label, className)}>
			{children}
			<span
				className={ProgressBarStyle.progressNumbers}
			>{`${currentValue}/${maxValue}`}</span>
			<progress
				className={ProgressBarStyle.progress}
				value={currentValue}
				max={maxValue}
			/>
		</label>
	);
};
