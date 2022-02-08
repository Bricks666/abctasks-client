import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameComponent } from "../../interfaces/common";

import LoadingIndicatorStyle from "./LoadingIndicator.module.css";

type Size = "small" | "medium" | "large";

interface LoadingIndicatorComponent extends ClassNameComponent {
	readonly size?: Size;
	readonly text?: string;
}

export const LoadingIndicator: FC<LoadingIndicatorComponent> = ({
	className,
	text,
	size = "medium",
}) => {
	const circle = classNames(
		LoadingIndicatorStyle.circle,
		LoadingIndicatorStyle[`circle--${size}`]
	);
	return (
		<div className={className}>
			<progress className="visibility-hidden" />
			<div>
				<div className={LoadingIndicatorStyle.circleGroup}>
					<span className={classNames(circle, LoadingIndicatorStyle.circle1)} />
					<span className={classNames(circle, LoadingIndicatorStyle.circle2)} />
					<span className={classNames(circle, LoadingIndicatorStyle.circle3)} />
					<span className={classNames(circle, LoadingIndicatorStyle.circle4)} />
				</div>
				{text && <h2 className={LoadingIndicatorStyle.header}>{text}</h2>}
			</div>
		</div>
	);
};
