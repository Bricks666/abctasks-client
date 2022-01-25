import classNames from "classnames";
import React, { ComponentType } from "react";
import { AnyObject, ClassNameComponent } from "../../interfaces/common";

import ListStyle from "./List.module.css";

interface ListComponent<T extends AnyObject> extends ClassNameComponent {
	readonly items: T[];
	readonly Component: ComponentType<T>;
	readonly indexedBy: keyof T;
	readonly itemClassName?: string;
}

export const List = <T extends AnyObject>({
	items,
	Component,
	indexedBy,
	itemClassName,
	className,
}: ListComponent<T>) => {
	return (
		<ul className={classNames(ListStyle.list, className)}>
			{items.map((item) => (
				<li className={itemClassName} key={item[indexedBy]}>
					<Component {...item} />
				</li>
			))}
		</ul>
	);
};
