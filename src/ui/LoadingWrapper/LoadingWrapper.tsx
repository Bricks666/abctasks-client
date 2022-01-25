import classNames from "classnames";
import React, { FC, memo, ReactElement } from "react";
import { ClassNameComponent } from "../../interfaces/common";

interface LoadingWrapperComponent extends ClassNameComponent {
	readonly isLoading: boolean;
	readonly loadingIndicator: ReactElement;
	readonly children: ReactElement | ReactElement[];
}

export const LoadingWrapper: FC<LoadingWrapperComponent> = memo(
	({ className, isLoading, loadingIndicator, children }) => {
		return isLoading ? (
			<div className={classNames(className)}>{loadingIndicator}</div>
		) : (
			<>{children}</>
		);
	}
);
