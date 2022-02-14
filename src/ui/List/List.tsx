import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "../../interfaces/common";

import ListStyle from "./List.module.css";

export const List: FC<ClassNameProps> = ({ className, children }) => {
	return <ul className={classNames(ListStyle.list, className)}>{children}</ul>;
};
