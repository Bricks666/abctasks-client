import React, { CSSProperties, FC, memo, ReactText } from "react";
import classNames from "classnames";
import { HEX, ClassNameProps } from "../../interfaces/common";

import ProgressBarStyle from "./ProgressBar.module.css";
import { Text } from "../Text";

interface ProgressBarProps extends ClassNameProps {
	readonly children: ReactText;
	readonly maxValue: number;
	readonly currentValue: number;
	readonly ariaText: string;
	readonly progressbarColor: HEX;
	readonly progressbarBGColor: HEX;
}

export const ProgressBar: FC<ProgressBarProps> = memo(
	({
		currentValue,
		maxValue,
		children,
		className,
		ariaText,
		progressbarBGColor,
		progressbarColor,
	}) => {
		const progressbarStyle: CSSProperties = {
			backgroundColor: progressbarBGColor || "white",
		};
		const progress: CSSProperties = {
			backgroundColor: progressbarColor || "blue",
			width: `${(currentValue / maxValue) * 100}%`,
		};

		return (
			<label className={classNames(ProgressBarStyle.label, className)}>
				{children}
				<Text component="span"
					className={ProgressBarStyle.progressNumbers}
				>{`${currentValue}/${maxValue}`}</Text>
				<div className={ProgressBarStyle.progressbar} style={progressbarStyle}>
					<div
						className={ProgressBarStyle.progress}
						style={progress}
						role="progressbar"
						aria-valuemin={0}
						aria-valuemax={maxValue}
						aria-valuenow={currentValue}
						aria-valuetext={ariaText}
					/>
				</div>
			</label>
		);
	}
);
