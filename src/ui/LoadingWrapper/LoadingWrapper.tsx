import classNames from "classnames";
import React, { FC, ReactElement } from "react";
import { ClassNameComponent } from "../../interfaces/common";

interface LoadingWrapperComponent extends ClassNameComponent {
	isLoading: boolean;
	loadingIndicator: ReactElement;
	children: ReactElement | ReactElement[];
}

export const LoadingWrapper: FC<LoadingWrapperComponent> = ({
	className,
	isLoading,
	loadingIndicator,
	children,
}) => {
	return isLoading ? (
		<div className={classNames(className)}>{loadingIndicator}</div>
	) : (
		<>{children}</>
	);
};
