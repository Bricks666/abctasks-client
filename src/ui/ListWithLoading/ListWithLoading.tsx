import React, { FC, ReactElement } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { List } from "../List";
import { LoadingWrapper } from "@/components/LoadingWrapper";

interface ListWithLoadingProps extends ClassNameProps {
	readonly isLoading: boolean;
	readonly loadingIndicator: ReactElement;
}

export const ListWithLoading: FC<ListWithLoadingProps> = ({
	loadingIndicator,
	isLoading,
	className,
	children,
}) => {
	return (
		<LoadingWrapper
			className={className}
			isLoading={isLoading}
			loadingIndicator={loadingIndicator}
		>
			<List className={className}>{children}</List>
		</LoadingWrapper>
	);
};
