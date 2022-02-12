import React, { ComponentType, ReactElement } from "react";
import { AnyObject, ClassNameProps } from "../../interfaces/common";
import { List } from "../List";
import { LoadingWrapper } from "../LoadingWrapper";

interface ListWithLoadingComponent<T> extends ClassNameProps {
	readonly items: T[];
	readonly Component: ComponentType<T>;
	readonly isLoading: boolean;
	readonly loadingIndicator: ReactElement;
	readonly indexedBy: keyof T;
	readonly itemClassName?: string;
}

export const ListWithLoading = <T extends AnyObject>({
	items,
	Component,
	indexedBy,
	loadingIndicator,
	isLoading,
	itemClassName,
	className,
}: ListWithLoadingComponent<T>) => {
	return (
		<LoadingWrapper
			className={className}
			isLoading={isLoading}
			loadingIndicator={loadingIndicator}
		>
			<List
				className={className}
				items={items}
				Component={Component}
				itemClassName={itemClassName}
				indexedBy={indexedBy as string | number}
			/>
		</LoadingWrapper>
	);
};
