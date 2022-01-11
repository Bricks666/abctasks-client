import classNames from "classnames";
import React, { FC, ReactElement } from "react";
import { OnlyClassName } from "../../interfaces/common";

interface LoadingWrapperComponent extends OnlyClassName {
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
