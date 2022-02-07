import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameComponent } from "../../interfaces/common";

export const Header: FC<ClassNameComponent> = ({ className }) => {
	return <header className={classNames(className)}></header>;
};
