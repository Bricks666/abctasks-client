import classNames from "classnames";
import React, { FC, memo, ReactElement } from "react";
import { ClassNameProps } from "../../interfaces/common";

import LoadingWrapperStyle from "./LoadingWrapper.module.css";

interface LoadingWrapperComponent extends ClassNameProps {
	readonly isLoading: boolean;
	readonly loadingIndicator: ReactElement;
}

export const LoadingWrapper: FC<LoadingWrapperComponent> = memo(
	({ className, isLoading, loadingIndicator, children }) => {
		return isLoading ? (
			<div className={classNames(LoadingWrapperStyle.wrapper, className)}>
				{loadingIndicator}
			</div>
		) : (
			<>{children}</>
		);
	}
);
