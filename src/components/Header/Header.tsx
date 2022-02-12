import classNames from "classnames";
import React, { FC } from "react";
import { ClassNameProps } from "../../interfaces/common";

export const Header: FC<ClassNameProps> = ({ className }) => {
	return <header className={classNames(className)}></header>;
};
