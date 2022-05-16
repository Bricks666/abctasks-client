import classNames from "classnames";
import React, { FC, memo, ReactElement } from "react";
import { ClassNameProps } from "@/interfaces/common";

import LoadingWrapperStyle from "./LoadingWrapper.module.css";

interface LoadingWrapperProps extends ClassNameProps {
	readonly isLoading: boolean;
	readonly loadingIndicator: ReactElement;
}

export const LoadingWrapper: FC<LoadingWrapperProps> = memo(
	function LoadingWrapper({
		className,
		isLoading,
		loadingIndicator,
		children,
	}) {
		return isLoading ? (
			<div className={classNames(LoadingWrapperStyle.wrapper, className)}>
				{loadingIndicator}
			</div>
		) : (
			<>{children}</>
		);
	}
);
