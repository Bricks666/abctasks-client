import React, { ComponentType, ReactElement } from "react";
import { AnyObject, ClassNameComponent } from "../../interfaces/common";
import { List } from "../List";
import { LoadingWrapper } from "../LoadingWrapper";

interface ListWithLoading<T> extends ClassNameComponent {
	items: T[];
	Component: ComponentType<T>;
	isLoading: boolean;
	loadingIndicator: ReactElement;
	indexedBy: keyof T;
	itemClassName?: string;
}

export const ListWithLoading = <T extends AnyObject>({
	items,
	Component,
	indexedBy,
	loadingIndicator,
	isLoading,
	itemClassName,
	className,
}: ListWithLoading<T>) => {
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
				indexedBy={indexedBy}
			/>
		</LoadingWrapper>
	);
};
