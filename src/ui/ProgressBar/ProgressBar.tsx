import React, { CSSProperties, FC, memo, ReactText } from "react";
import classNames from "classnames";
import { HEX, ClassNameProps } from "../../interfaces/common";

import ProgressBarStyle from "./ProgressBar.module.css";

interface ProgressBarComponent extends ClassNameProps {
	readonly children: ReactText;
	readonly maxValue: number;
	readonly currentValue: number;
	readonly ariaText: string;
	readonly progressbarColor: HEX;
	readonly progressbarBGColor: HEX;
}

export const ProgressBar: FC<ProgressBarComponent> = memo(
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
			backgroundColor: progressbarBGColor,
		};
		const progress: CSSProperties = {
			backgroundColor: progressbarColor,
			width: `${(currentValue / maxValue) * 100}%`,
		};

		return (
			<label className={classNames(ProgressBarStyle.label, className)}>
				{children}
				<span
					className={ProgressBarStyle.progressNumbers}
				>{`${currentValue}/${maxValue}`}</span>
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
